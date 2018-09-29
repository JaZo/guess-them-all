import Vue from 'vue';

const bus = new Vue();

Object.defineProperty(Vue.prototype, '$bus', {
    get () {
        return bus;
    },
});

export default bus;
