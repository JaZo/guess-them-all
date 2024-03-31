import Vue from 'vue';
import App from './App.vue';
import bus from './bus';
import i18n from './i18n';
import router from './router';
import store from './store';
import theme from './theme';
import { registerSW } from 'virtual:pwa-register';

Vue.config.productionTip = false;

new Vue({
    bus,
    i18n,
    router,
    store,
    theme,
    render: h => h(App),
}).$mount('#app');

if (import.meta.env.PROD) {
    registerSW({
        onOfflineReady () {
            bus.$emit('offline-installed');
        },
        onNeedRefresh () {
            bus.$emit('offline-updated');
        },
    });
}
