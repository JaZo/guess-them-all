import {createI18n} from 'vue-i18n';
import messages from './messages';
import store from '../store';

const i18n = createI18n({
    locale: store.state.settings.locale,
    fallbackLocale: Object.keys(messages)[0],
    messages,
});

export default i18n;
