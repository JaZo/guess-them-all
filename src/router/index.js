import Vue from 'vue';
import Router from 'vue-router';
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
            path: '/teams',
            name: 'teams',
            component: Teams,
            meta: {
                allowBack: true
            }
        },
        {
            path: '/teams/:id',
            name: 'team',
            component: Team,
            meta: {
                allowBack: true
            }
        },
        {
            path: '/game',
            name: 'game',
            component: Game,
            meta: {
                allowBack: false
            },
            children: [
                {
                    path: 'index',
                    name: 'game-index',
                    component: GameIndex
                },
                {
                    path: 'ready',
                    name: 'game-ready',
                    component: GameReady
                },
                {
                    path: 'game',
                    name: 'game-game',
                    component: GameGame
                },
                {
                    path: 'time-over',
                    name: 'game-time-over',
                    component: GameTimeOver
                },
                {
                    path: 'results',
                    name: 'game-results',
                    component: GameResults
                },
                {
                    path: 'game-over',
                    name: 'game-game-over',
                    component: GameGameOVer
                }
            ]
        }
    ]
});
