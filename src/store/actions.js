import Entities from '@/services/entities'

export const startGame = (context) => {
    context.commit('resetUsedEntities');
    context.commit('resetScore');
    context.commit('resetTime');
    context.commit('resetTurn');
    context.commit('resetWinner');
    context.commit('setEntities', []);
}

export const startRound = (context) => {
    let entities = Entities.get(context.state.settings.numberOfEntitiesPerRound, context.state.usedEntities);

    context.commit('setEntities', entities);
    context.commit('addUsedEntities', entities);
}

export const endRound = (context, {score}) => {
    let teamId = context.state.teamList[context.state.turn.team];

    context.commit('addPointsToTeam', {teamId, points: score});
    context.commit('setEntities', []);
    context.commit('resetTime');

    if (context.state.score[teamId] >= context.state.settings.pointsNeededToWin) {
        context.commit('setWinner', teamId);
    } else {
        context.commit('nextTurn');
    }
}

export const endGame = (context) => {
    context.commit('resetGameState');
}

export const stopGame = (context) => {
    context.commit('resetGameState');
    context.commit('resetUsedEntities');
    context.commit('resetScore');
    context.commit('resetTime');
    context.commit('resetTurn');
    context.commit('resetWinner');
    context.commit('setEntities', []);
}
