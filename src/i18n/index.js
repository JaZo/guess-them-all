import Vue from 'vue'
import VueI18n from 'vue-i18n'
import * as messages from './messages'
import store from '../store';

Vue.use(VueI18n)

export default new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages
})
