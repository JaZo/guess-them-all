import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as getters from './getters'
import * as mutations from './mutations'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    plugins: [createPersistedState({
        paths: [
            'teams',
            'players'
        ]
    })],
    state,
    getters,
    mutations
})
