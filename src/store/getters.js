export const teamSet = (state) => {
    return state.teamList.map((teamId) => ({id: teamId, ...state.teams[teamId]}));
}

export const readyToStart = (state) => {
    return state.teamList.length >= 2 && state.teamList.every((id) => {
        return state.teams[id].players.length >= 2;
    });
}

export const teamInTurn = (state) => {
    return state.teams[state.teamList[state.turn.team]];
}

export const playerInTurn = (state, getters) => {
    return state.players[getters.teamInTurn.players[state.turn.player[state.turn.team]]];
}
