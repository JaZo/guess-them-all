export const gameInProgress = (state) => {
    return state.gameState !== null && state.gameState !== 'game-game-over';
}

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
    return state.players[getters.teamInTurn.players[state.turn.player[state.turn.team] || 0]];
}

export const winningTeam = (state) => {
    return state.winner !== null ? state.teams[state.winner] : null;
}
