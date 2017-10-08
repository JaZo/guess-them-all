import Entities from '@/services/entities'

const POINTS_NEEDED_TO_WIN = 30;

export const startGame = (context) => {
    context.commit('resetUsedEntities');
    context.commit('resetScore');
    context.commit('resetTime');
    context.commit('resetWinner');
    context.commit('setEntities', []);
}

export const startRound = (context) => {
    let entities = Entities.get(context.state.usedEntities);

    context.commit('setEntities', entities);
    context.commit('addUsedEntities', entities);
}

export const endRound = (context, {score}) => {
    let teamId = context.state.teamList[context.state.turn.team];

    context.commit('addPointsToTeam', {teamId, points: score});
    context.commit('setEntities', []);
    context.commit('resetTime');

    if (context.state.score[teamId] >= POINTS_NEEDED_TO_WIN) {
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
    context.commit('resetWinner');
    context.commit('setEntities', []);
}
