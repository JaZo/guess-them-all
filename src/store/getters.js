export const teamSet = (state) => {
    return state.teamList.map((teamId) => ({id: teamId, ...state.teams[teamId]}));
}

export const readyToStart = (state) => {
    return state.teamList.length >= 2 && state.teamList.every((id) => {
        return state.teams[id].players.length >= 2;
    });
}
