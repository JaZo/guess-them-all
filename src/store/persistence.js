import entities from '../data/entities';

// Key vuex-persistedstate used. Its state is moved to the store's own key, so existing users keep their
// teams, settings and game in progress.
const LEGACY_STORAGE_KEY = 'vuex';

const availableEntityLists = Object.keys(entities).flatMap((language) => {
    return Object.keys(entities[language]).map((key) => language + '.' + key);
});

const read = (key) => {
    try {
        const parsed = JSON.parse(window.localStorage.getItem(key));

        return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
        return null;
    }
};

const write = (key, state) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(state));

        return true;
    } catch {
        // Storage unavailable (private mode, quota exceeded): keep running without persistence.
        return false;
    }
};

const remove = (key) => {
    try {
        window.localStorage.removeItem(key);
    } catch {
        // Storage unavailable: nothing to remove.
    }
};

const migrate = (persisted, defaults) => {
    // The time-over screen merged into the results screen.
    if (persisted.gameState === 'game-time-over') {
        persisted.gameState = 'game-results';
    }

    if (persisted.settings) {
        // Remove deprecated entity lists from stored state.
        const entityLists = (persisted.settings.entities || []).filter((e) => availableEntityLists.includes(e));

        persisted.settings.entities = entityLists.length > 0 ? entityLists : defaults.settings.entities.slice();
    }

    return persisted;
};

/**
 * Pinia plugin that persists the given store to localStorage, under the store's id.
 *
 * @param {String} storeId
 */
export const createPersistence = (storeId) => ({store}) => {
    if (store.$id !== storeId) {
        return;
    }

    const key = store.$id;
    const persisted = read(key) || read(LEGACY_STORAGE_KEY);

    if (persisted) {
        const defaults = JSON.parse(JSON.stringify(store.$state));

        migrate(persisted, defaults);

        store.$patch((state) => {
            Object.keys(state).forEach((key) => {
                if (!(key in persisted)) {
                    return;
                }

                // Settings are merged, so settings added in newer versions get their default value.
                state[key] = key === 'settings'
                    ? {...state.settings, ...persisted.settings}
                    : persisted[key];
            });
        });
    }

    // Only drop the legacy state once it is safely stored under the new key.
    if (write(key, store.$state)) {
        remove(LEGACY_STORAGE_KEY);
    }

    store.$subscribe((mutation, state) => write(key, state), {detached: true, flush: 'sync'});
};
