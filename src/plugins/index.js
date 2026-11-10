/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify';
import router from '@/router';
import pinia from '@/store';
import {useGameStore} from '@/store/game';
import i18n from '@/i18n';
import 'animate.css/animate.css';
import '@/styles/app.scss';

export function registerPlugins(app) {
    app.use(pinia);

    i18n.global.locale.value = useGameStore().settings.locale;

    app
        .use(vuetify)
        .use(router)
        .use(i18n);
}
