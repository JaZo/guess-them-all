import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Game from '@/pages/Game';
import GameIndex from '@/pages/game/Index';
import GameReady from '@/pages/game/Ready';
import GameTeam from '@/pages/game/Team';
import GameNew from '@/pages/game/New';
import GameGame from '@/pages/game/Game';
import GameTimeOver from '@/pages/game/TimeOver';
import GameResults from '@/pages/game/Results';
import GameGameOVer from '@/pages/game/GameOVer';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                allowBack: false
            }
        },
        {
            path: '/game',
            name: 'game',
            component: Game,
            meta: {
                allowBack: true
            },
            children: [
                {
                    path: 'new',
                    name: 'game-new',
                    component: GameNew,
                    meta: {
                        allowBack: true
                    }
                },
                {
                    path: 'new/team/:id',
                    name: 'game-new-team',
                    component: GameTeam,
                    meta: {
                        allowBack: true
                    }
                },
                {
                    path: 'index',
                    name: 'game-index',
                    component: GameIndex,
                    meta: {
                        allowBack: false
                    }
                },
                {
                    path: 'ready',
                    name: 'game-ready',
                    component: GameReady,
                    meta: {
                        allowBack: false
                    }
                },
                {
                    path: 'game',
                    name: 'game-game',
                    component: GameGame,
                    meta: {
                        allowBack: false
                    }
                },
                {
                    path: 'time-over',
                    name: 'game-time-over',
                    component: GameTimeOver,
                    meta: {
                        allowBack: false
                    }
                },
                {
                    path: 'results',
                    name: 'game-results',
                    component: GameResults,
                    meta: {
                        allowBack: false
                    }
                },
                {
                    path: 'game-over',
                    name: 'game-game-over',
                    component: GameGameOVer,
                    meta: {
                        allowBack: false
                    }
                }
            ]
        }
    ]
});
