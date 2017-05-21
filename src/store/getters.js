export const teamsReady = (state, getters) => {
    if (Object.keys(state.teams).length < 2) {
        return false;
    }

    for (let id in state.teams) {
        if (state.teams.hasOwnProperty(id) && getters.playersInTeamCount(id) < 2) {
            return false;
        }
    }

    return true;
}

export const playersInTeam = (state) => (id) => {
    let players = {};

    for (let playerId in state.players) {
        if (state.players.hasOwnProperty(playerId)) {
            if (state.players[playerId].team === id) {
                players[playerId] = state.players[playerId];
            }
        }
    }

    return players;
}

export const playersInTeamCount = (state, getters) => (id) => {
    return Object.keys(getters.playersInTeam(id)).length;
}
