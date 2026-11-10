// Composables
import {createRouter, createWebHashHistory} from 'vue-router';

// Plugins
import routes from './routes';
import {useGameStore} from '@/store/game';

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

router.beforeEach((to, from) => {
    const store = useGameStore();

    if (store.gameInProgress && routeIsGameRoute(to)) {
        // Coming from another game route, we are only allowed to go to certain routes
        if (routeIsGameRoute(from) && from.meta.allowedNextRoutes.indexOf(to.name) === -1) {
            return false;
        }

        // Coming from somewhere else, we are only allowed to go to the route belonging to the current gameState
        if (!routeIsGameRoute(from) && to.name !== store.gameState) {
            return { name: store.gameState };
        }
    }
});

router.afterEach((to) => {
    if (routeIsGameRoute(to)) {
        useGameStore().setGameState(to.name);
    }
});

const routeIsGameRoute = (route) => {
    return route.matched.some(route => route.name === 'game');
};

