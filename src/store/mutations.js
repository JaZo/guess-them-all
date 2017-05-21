import Vue from 'vue'

// Teams
export const createTeam = (state) => {
    let id = String(Math.max(...Object.keys(state.teams)) + 1);
    Vue.set(state.teams, id, {name: 'Team ' + id});
    createPlayer(state, {teamId: id});
}

export const updateTeam = (state, {id, team}) => {
    Vue.set(state.teams, id, team);
}

export const deleteTeam = (state, {id}) => {
    Vue.delete(state.teams, id);
    // Delete all players from this team
    for (let playerId in state.players) {
        if (state.players.hasOwnProperty(playerId) && state.players[playerId].team === id) {
            deletePlayer(state, {id: playerId});
        }
    }
}

// Players
export const createPlayer = (state, {teamId}) => {
    let id = String(Math.max(...Object.keys(state.players)) + 1);
    Vue.set(state.players, id, {name: 'Player ' + id, team: teamId});
}

export const updatePlayer = (state, {id, player}) => {
    Vue.set(state.players, id, player);
}

export const deletePlayer = (state, {id}) => {
    Vue.delete(state.players, id);
}
