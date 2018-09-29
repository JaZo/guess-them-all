import Vue from 'vue';
import App from './App';
import bus from './bus';
import i18n from './i18n';
import router from './router';
import store from './store';
import theme from './theme';
import registerServiceWorker from './service-worker/register';

Vue.config.productionTip = false;

new Vue({
    bus,
    i18n,
    router,
    store,
    theme,
    render: h => h(App),
}).$mount('#app');

if (process.env.NODE_ENV === 'production') {
    registerServiceWorker(() => {
        bus.$emit('offline-installed');
    }, () => {
        bus.$emit('offline-updated');
    });
}
