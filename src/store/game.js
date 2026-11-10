import {defineStore} from 'pinia';
import i18n from '../i18n';
import Entities from '@/services/entities';
import state from './state';

export const useGameStore = defineStore('game', {
    state,

    getters: {
        gameInProgress: (state) => state.gameState !== null && state.gameState !== 'game-game-over',

        teamSet: (state) => state.teamList.map((teamId) => ({id: teamId, ...state.teams[teamId]})),

        readyToStart: (state) => state.teamList.length >= 2 && state.teamList.every((id) => {
            return state.teams[id].players.length >= 2;
        }),

        teamInTurn: (state) => state.teams[state.teamList[state.turn.team]],

        playerInTurn() {
            return this.players[this.teamInTurn.players[this.turn.player[this.turn.team] || 0]];
        },

        winningTeam: (state) => state.winner !== null ? state.teams[state.winner] : null,
    },

    actions: {
        // Settings
        updateSettings(settings) {
            this.settings = settings;
            i18n.global.locale.value = settings.locale;
        },

        // Game state
        setGameState(gameState) {
            this.gameState = gameState;
        },

        // Teams
        createTeam() {
            const id = String(Math.max(0, ...Object.keys(this.teams)) + 1);
            this.teams[id] = {name: 'Team ' + id, players: []};
            this.teamList.push(id);
            this.createPlayer({teamId: id});
        },

        updateTeam({id, team}) {
            this.teams[id] = team;
        },

        deleteTeam({id}) {
            this.teams[id].players.forEach((playerId) => {
                delete this.players[playerId];
            });
            this.teamList.splice(this.teamList.indexOf(id), 1);
            delete this.teams[id];
        },

        // Players
        createPlayer({teamId}) {
            const id = String(Math.max(0, ...Object.keys(this.players)) + 1);
            this.players[id] = {name: 'Player ' + id};
            this.teams[teamId].players.push(id);
        },

        updatePlayer({id, player}) {
            this.players[id] = player;
        },

        deletePlayer({id}) {
            this.teamList.forEach((teamId) => {
                const index = this.teams[teamId].players.indexOf(id);
                if (index !== -1) {
                    this.teams[teamId].players.splice(index, 1);
                }
            });
            delete this.players[id];
        },

        // Time
        setTime(time) {
            this.time = time;
        },

        // Game flow
        resetGame() {
            this.usedEntities = [];
            this.score = {};
            this.time = 0;
            this.turn = {team: 0, player: {}};
            this.winner = null;
            this.entities = [];
        },

        randomizeTurn() {
            const player = {};
            Object.keys(this.teams).forEach((index) => {
                player[index] = Math.floor(Math.random() * this.teams[index].players.length);
            });
            this.turn = {team: Math.floor(Math.random() * this.teamList.length), player};
        },

        nextTurn() {
            const {team, player} = this.turn;
            player[team] = ((player[team] || 0) + 1) % this.teams[this.teamList[team]].players.length;
            this.turn.team = (team + 1) % this.teamList.length;
        },

        startGame() {
            this.resetGame();
            this.randomizeTurn();
        },

        endGame() {
            this.gameState = null;
        },

        stopGame() {
            this.endGame();
            this.resetGame();
        },

        startRound() {
            const entities = Entities.get(this.settings.entities, this.settings.numberOfEntitiesPerRound, this.usedEntities);

            this.entities = entities;
            this.usedEntities = this.usedEntities.concat(entities);
        },

        endRound({score}) {
            const teamId = this.teamList[this.turn.team];

            this.score[teamId] = (this.score[teamId] || 0) + score;
            this.entities = [];
            this.time = 0;

            if (this.score[teamId] >= this.settings.pointsNeededToWin) {
                this.winner = teamId;
            } else {
                this.nextTurn();
            }
        },
    },
});
