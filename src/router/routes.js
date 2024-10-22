import i18n from '../i18n';
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
import GameTimeOver from '@/pages/game/TimeOver.vue';
import GameResults from '@/pages/game/Results.vue';
import GameGameOVer from '@/pages/game/GameOver.vue';

const {t: $t} = i18n.global;

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
            title() {
                return $t('rules.title');
            },
        },
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: {
            allowBack: true,
            title() {
                return $t('settings.title');
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
            title() {
                return $t('teams.title');
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
            title() {
                return $t('teams.title');
            },
        },
    },
    {
        path: '/game',
        name: 'game',
        component: Game,
        meta: {
            allowBack: false,
            title() {
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
