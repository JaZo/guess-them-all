import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: import.meta.env.DEV,
    plugins: [createPersistedState()],
    state,
    getters,
    mutations,
    actions,
});
