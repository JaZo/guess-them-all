import store from '../store';
import Home from '@/pages/Home';
import Teams from '@/pages/Teams';
import Team from '@/pages/Team';
import Game from '@/pages/Game';
import GameIndex from '@/pages/game/Index';
import GameReady from '@/pages/game/Ready';
import GameGame from '@/pages/game/Game';
import GameTimeOver from '@/pages/game/TimeOver';
import GameResults from '@/pages/game/Results';
import GameGameOVer from '@/pages/game/GameOver';

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            allowBack: false
        }
    },
    {
        path: '/teams',
        name: 'teams',
        component: Teams,
        meta: {
            allowBack: true,
            title() {
                return 'Teams';
            }
        }
    },
    {
        path: '/teams/:id',
        name: 'team',
        component: Team,
        meta: {
            allowBack: true,
            title() {
                return 'Teams';
            }
        }
    },
    {
        path: '/game',
        name: 'game',
        component: Game,
        meta: {
            allowBack: false,
            title() {
                return store.getters.teamInTurn.name;
            }
        },
        children: [
            {
                path: 'index',
                name: 'game-index',
                component: GameIndex,
                meta: {
                    allowHome: true,
                    allowedNextRoutes: [
                        'game-ready'
                    ]
                }
            },
            {
                path: 'ready',
                name: 'game-ready',
                component: GameReady,
                meta: {
                    allowedNextRoutes: [
                        'game-game'
                    ]
                }
            },
            {
                path: 'game',
                name: 'game-game',
                component: GameGame,
                meta: {
                    allowedNextRoutes: [
                        'game-time-over'
                    ]
                }
            },
            {
                path: 'time-over',
                name: 'game-time-over',
                component: GameTimeOver,
                meta: {
                    allowedNextRoutes: [
                        'game-results'
                    ]
                }
            },
            {
                path: 'results',
                name: 'game-results',
                component: GameResults,
                meta: {
                    allowedNextRoutes: [
                        'game-index',
                        'game-game-over'
                    ]
                }
            },
            {
                path: 'game-over',
                name: 'game-game-over',
                component: GameGameOVer,
                meta: {
                    allowHome: true,
                    allowedNextRoutes: [
                        'home'
                    ]
                }
            }
        ]
    }
];
