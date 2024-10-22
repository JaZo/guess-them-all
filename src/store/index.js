import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import state from './state';

const store = createStore({
    strict: import.meta.env.DEV,
    plugins: [createPersistedState()],
    state,
    getters,
    mutations,
    actions,
});

export default store;
