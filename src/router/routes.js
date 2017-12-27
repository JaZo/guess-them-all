import i18n from '../i18n';
import store from '../store';
import Home from '@/pages/Home';
import Rules from '@/pages/Rules';
import Settings from '@/pages/Settings';
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
            allowBack: false,
            allowSettings: true
        }
    },
    {
        path: '/rules',
        name: 'rules',
        component: Rules,
        meta: {
            allowBack: true,
            title() {
                return i18n.t('rules.title');
            }
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: {
            allowBack: true,
            title() {
                return i18n.t('settings.title');
            }
        }
    },
    {
        path: '/teams',
        name: 'teams',
        component: Teams,
        meta: {
            allowBack: true,
            allowSettings: true,
            title() {
                return i18n.t('teams.title');
            }
        }
    },
    {
        path: '/teams/:id',
        name: 'team',
        component: Team,
        meta: {
            allowBack: true,
            allowSettings: true,
            title() {
                return i18n.t('teams.title');
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
                    allowSettings: true,
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