import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './messages';
import store from '../store';

Vue.use(VueI18n);

export default new VueI18n({
    locale: store.state.settings.locale,
    fallbackLocale: Object.keys(messages)[0],
    messages
});
