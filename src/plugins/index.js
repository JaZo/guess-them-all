/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify';
import router from '@/router';
import store from '@/store';
import i18n from '@/i18n';
import 'animate.css/animate.css';
import '@/styles/app.scss';

export function registerPlugins(app) {
    i18n.global.locale = store.state.settings.locale;

    app
        .use(vuetify)
        .use(router)
        .use(store)
        .use(i18n);
}
