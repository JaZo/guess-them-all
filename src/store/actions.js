import Entities from '@/services/entities'

export const start = (context) => {
    context.commit('resetUsedEntities');
}

export const getEntities = (context) => {
    let entities = Entities.get(context.state.usedEntities);

    context.commit('addUsedEntities', entities);

    return entities;
}
