// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import i18n from './i18n';
import router from './router';
import store from './store';
import theme from './theme';
import registerServiceWorker from './service-worker/register';

Vue.config.productionTip = false;

let vm = new Vue({
    el: '#app',
    i18n,
    router,
    store,
    theme,
    ...App
});

if (process.env.NODE_ENV === 'production') {
    registerServiceWorker(() => {
        vm.openOfflineReady();
    });
}
