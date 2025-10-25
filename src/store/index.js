import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import state from './state';
import entities from '../data/entities';

const availableEntityLists = Object.keys(entities).reduce((acc, language) => {
    Object.keys(entities[language]).reduce((acc, key) => {
        acc.push(language + '.' + key);
        return acc;
    }, acc);
    return acc;
}, []);

const store = createStore({
    strict: import.meta.env.DEV,
    plugins: [createPersistedState({
        getState(key, storage) {
            const value = storage.getItem(key);
            let parsed;

            try {
                parsed = (typeof value === 'string')
                    ? JSON.parse(value) : (typeof value === 'object')
                        ? value : undefined;
            } catch (err) {
                return undefined;
            }

            if (!parsed) {
                return undefined;
            }

            // Remove deprecated entityLists from stored state.
            parsed.settings.entities = parsed.settings.entities.filter(e => availableEntityLists.includes(e));
            if (parsed.settings.entities.length === 0) {
                parsed.settings.entities = state.settings.entities.slice();
            }

            storage.setItem(key, JSON.stringify(parsed));

            return parsed;
        },
    })],
    state,
    getters,
    mutations,
    actions,
});

export default store;
