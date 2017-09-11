import Vue from 'vue'

// Teams
export const createTeam = (state) => {
    let id = String(Math.max(0, ...Object.keys(state.teams)) + 1);
    Vue.set(state.teams, id, {name: 'Team ' + id, players: []});
    state.teamList.push(id);
    createPlayer(state, {teamId: id});
}

export const updateTeam = (state, {id, team}) => {
    Vue.set(state.teams, id, team);
}

export const deleteTeam = (state, {id}) => {
    // Delete all players from this team
    state.teams[id].players.forEach((playerId) => {
        Vue.delete(state.players, playerId);
    });
    // Delete the team itself
    state.teamList.splice(state.teamList.indexOf(id), 1);
    Vue.delete(state.teams, id);
}

// Players
export const createPlayer = (state, {teamId}) => {
    let id = String(Math.max(0, ...Object.keys(state.players)) + 1);
    Vue.set(state.players, id, {name: 'Player ' + id});
    state.teams[teamId].players.push(id);
}

export const updatePlayer = (state, {id, player}) => {
    Vue.set(state.players, id, player);
}

export const deletePlayer = (state, {id}) => {
    // Remove this player from its team
    state.teamList.forEach((teamId) => {
        let index = state.teams[teamId].players.indexOf(id);
        if (index !== -1) {
            state.teams[teamId].players.splice(index, 1);
        }
    });
    Vue.delete(state.players, id);
}

// Turn
export const nextTurn = (state) => {
    // TODO: Use Vue.set for this!
    state.turn.player[state.turn.team] = ((state.turn.player[state.turn.team] || 0) + 1) % state.teams[state.teamList[state.turn.team]].players.length;
    state.turn.team = (state.turn.team + 1) % state.teamList.length;
}

// Used entities
export const resetUsedEntities = (state) => {
    state.usedEntities = [];
}

export const addUsedEntities = (state, entities) => {
    state.usedEntities = state.usedEntities.concat(entities);
}
