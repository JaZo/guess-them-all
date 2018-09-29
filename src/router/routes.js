import i18n from '../i18n';
import store from '../store';
import Home from '@/views/Home';
import Rules from '@/views/Rules';
import Settings from '@/views/Settings';
import Teams from '@/views/Teams';
import Team from '@/views/Team';
import Game from '@/views/Game';
import GameIndex from '@/views/game/Index';
import GameReady from '@/views/game/Ready';
import GameGame from '@/views/game/Game';
import GameTimeOver from '@/views/game/TimeOver';
import GameResults from '@/views/game/Results';
import GameGameOVer from '@/views/game/GameOver';

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            allowBack: false,
            allowSettings: true,
        },
    },
    {
        path: '/rules',
        name: 'rules',
        component: Rules,
        meta: {
            allowBack: true,
            title () {
                return i18n.t('rules.title');
            },
        },
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: {
            allowBack: true,
            title () {
                return i18n.t('settings.title');
            },
        },
    },
    {
        path: '/teams',
        name: 'teams',
        component: Teams,
        meta: {
            allowBack: true,
            allowSettings: true,
            title () {
                return i18n.t('teams.title');
            },
        },
    },
    {
        path: '/teams/:id',
        name: 'team',
        component: Team,
        meta: {
            allowBack: true,
            allowSettings: true,
            title () {
                return i18n.t('teams.title');
            },
        },
    },
    {
        path: '/game',
        name: 'game',
        component: Game,
        meta: {
            allowBack: false,
            title () {
                return store.getters.teamInTurn.name;
            },
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
                        'game-time-over',
                    ],
                },
            },
            {
                path: 'time-over',
                name: 'game-time-over',
                component: GameTimeOver,
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
                    allowHome: true,
                    allowedNextRoutes: [
                        'home',
                    ],
                },
            },
        ],
    },
];
