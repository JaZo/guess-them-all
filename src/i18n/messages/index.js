import i18n from '../index';
import en from './en';
import nl from './nl';

export default {
    en,
    nl,
};

// Hot updates
if (module.hot) {
    module.hot.accept(['./en', './nl'], () => {
        i18n.setLocaleMessage('en', en);
        i18n.setLocaleMessage('nl', nl);
    });
}
