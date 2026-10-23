import {createI18n} from 'vue-i18n';
import messages from './messages';

// The locale is set from the stored settings when the plugins are registered.
const i18n = createI18n({
    locale: Object.keys(messages)[0],
    fallbackLocale: Object.keys(messages)[0],
    messages,
});

export default i18n;
