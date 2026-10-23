import store from '../store';
import Home from '@/pages/Home.vue';
import Rules from '@/pages/Rules.vue';
import Settings from '@/pages/Settings.vue';
import Teams from '@/pages/Teams.vue';
import Team from '@/pages/Team.vue';
import Game from '@/pages/Game.vue';
import GameIndex from '@/pages/game/Index.vue';
import GameReady from '@/pages/game/Ready.vue';
import GameGame from '@/pages/game/Game.vue';
import GameResults from '@/pages/game/Results.vue';
import GameGameOVer from '@/pages/game/GameOver.vue';

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/rules',
        name: 'rules',
        component: Rules,
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
    },
    {
        path: '/teams',
        name: 'teams',
        component: Teams,
    },
    {
        path: '/teams/:id',
        name: 'team',
        component: Team,
        beforeEnter(to) {
            if (!store.state.teams[to.params.id]) {
                return {name: 'teams'};
            }
        },
    },
    {
        path: '/game',
        name: 'game',
        component: Game,
        children: [
            {
                path: 'index',
                name: 'game-index',
                component: GameIndex,
                meta: {
                    allowedNextRoutes: [
                        'game-ready',
                    ],
                },
            },
            {
                path: 'ready',
                name: 'game-ready',
                component: GameReady,
                meta: {
                    allowedNextRoutes: [
                        'game-index',
                        'game-game',
                    ],
                },
            },
            {
                path: 'game',
                name: 'game-game',
                component: GameGame,
                meta: {
                    allowedNextRoutes: [
                        'game-results',
                    ],
                },
            },
            {
                path: 'results',
                name: 'game-results',
                component: GameResults,
                meta: {
                    allowedNextRoutes: [
                        'game-index',
                        'game-game-over',
                    ],
                },
            },
            {
                path: 'game-over',
                name: 'game-game-over',
                component: GameGameOVer,
                meta: {
                    allowedNextRoutes: [
                        'home',
                    ],
                },
            },
        ],
    },
];
