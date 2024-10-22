import i18n from '../i18n';

// Settings
export const updateSettings = (state, settings) => {
    state.settings = settings;
    i18n.global.locale = state.settings.locale;
};

// Game state
export const setGameState = (state, gameState) => {
    state.gameState = gameState;
};

export const resetGameState = (state) => {
    state.gameState = null;
};

// Teams
export const createTeam = (state) => {
    const id = String(Math.max(0, ...Object.keys(state.teams)) + 1);
    state.teams[id] = {name: 'Team ' + id, players: []};
    state.teamList.push(id);
    createPlayer(state, {teamId: id});
};

export const updateTeam = (state, {id, team}) => {
    state.teams[id] = team;
};

export const deleteTeam = (state, {id}) => {
    // Delete all players from this team
    state.teams[id].players.forEach((playerId) => {
        delete state.players[playerId], playerId;
    });
    // Delete the team itself
    state.teamList.splice(state.teamList.indexOf(id), 1);
    delete state.teams[id];
};

// Players
export const createPlayer = (state, {teamId}) => {
    const id = String(Math.max(0, ...Object.keys(state.players)) + 1);
    state.players[id] = {name: 'Player ' + id};
    state.teams[teamId].players.push(id);
};

export const updatePlayer = (state, {id, player}) => {
    state.players[id] = player;
};

export const deletePlayer = (state, {id}) => {
    // Remove this player from its team
    state.teamList.forEach((teamId) => {
        const index = state.teams[teamId].players.indexOf(id);
        if (index !== -1) {
            state.teams[teamId].players.splice(index, 1);
        }
    });
    delete state.players[id];
};

// Turn
export const nextTurn = (state) => {
    state.turn.player[state.turn.team] = ((state.turn.player[state.turn.team] || 0) + 1) % state.teams[state.teamList[state.turn.team]].players.length;
    state.turn.team = (state.turn.team + 1) % state.teamList.length;
};

export const resetTurn = (state) => {
    state.turn.team = 0;
    state.turn.player = {};
};

export const randomizeTurn = (state) => {
    state.turn.team = Math.floor(Math.random() * state.teamList.length);
    state.turn.player = {};
    Object.keys(state.teams).forEach((index) => {
        state.turn.player[index] = Math.floor(Math.random() * state.teams[index].players.length);
    });
};

// Entities
export const setEntities = (state, entities) => {
    state.entities = entities;
};

// Used entities
export const resetUsedEntities = (state) => {
    state.usedEntities = [];
};

export const addUsedEntities = (state, entities) => {
    state.usedEntities = state.usedEntities.concat(entities);
};

// Time
export const setTime = (state, time) => {
    state.time = time;
};

export const resetTime = (state) => {
    state.time = 0;
};

// Score
export const resetScore = (state) => {
    state.score = {};
};

export const addPointsToTeam = (state, {teamId, points}) => {
    state.score[teamId] = (state.score[teamId] || 0) + points;
};

export const setWinner = (state, winner) => {
    state.winner = winner;
};

export const resetWinner = (state) => {
    state.winner = null;
};
