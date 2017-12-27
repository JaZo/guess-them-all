// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import bus from './bus';
import i18n from './i18n';
import router from './router';
import store from './store';
import theme from './theme';
import registerServiceWorker from './service-worker/register';

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    bus,
    i18n,
    router,
    store,
    theme,
    template: '<App/>',
    components: {App}
});

if (process.env.NODE_ENV === 'production') {
    registerServiceWorker(() => {
        bus.$emit('offline-installed');
    }, () => {
        bus.$emit('offline-updated');
    });
}
