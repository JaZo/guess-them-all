import entities from '../data/entities';

// Same key vuex-persistedstate used, so existing users keep their teams, settings and game in progress.
export const STORAGE_KEY = 'vuex';

const availableEntityLists = Object.keys(entities).flatMap((language) => {
    return Object.keys(entities[language]).map((key) => language + '.' + key);
});

const read = () => {
    try {
        const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY));

        return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
        return null;
    }
};

const write = (state) => {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // Storage unavailable (private mode, quota exceeded): keep running without persistence.
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
 * Pinia plugin that persists the given store to localStorage.
 *
 * @param {String} storeId
 */
export const createPersistence = (storeId) => ({store}) => {
    if (store.$id !== storeId) {
        return;
    }

    const persisted = read();

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

    write(store.$state);

    store.$subscribe((mutation, state) => write(state), {detached: true, flush: 'sync'});
};
