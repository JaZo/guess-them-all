import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '../store';

Vue.use(Router);

const router = new Router({
    routes,
});

export default router;

router.beforeEach((to, from, next) => {
    if (store.getters.gameInProgress && routeIsGameRoute(to)) {
        // Coming from another game route, we are only allowed to go to certain routes
        if (routeIsGameRoute(from) && from.meta.allowedNextRoutes.indexOf(to.name) === -1) {
            return next(false);
        }

        // Coming from somewhere else, we are only allowed to go to the route belonging to the current gameState
        if (!routeIsGameRoute(from) && to.name !== store.state.gameState) {
            return next({ name: store.state.gameState });
        }
    }

    return next();
});

router.afterEach((to) => {
    if (routeIsGameRoute(to)) {
        store.commit('setGameState', to.name);
    }
});

const routeIsGameRoute = (route) => {
    return route.matched.some(route => route.name === 'game');
};
