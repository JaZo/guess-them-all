import entities from '../data/entities';

export default class Entities {
    /**
     * @param {Array}  listIds
     * @param {Number} amount
     * @param {Array}  excludedEntities
     *
     * @returns {Array}
     */
    static get (listIds, amount, excludedEntities = []) {
        return this.getEntitiesFromLists(listIds)
            .filter((entity) => excludedEntities.indexOf(entity) < 0)
            .sort(() => 0.5 - Math.random())
            .slice(0, amount);
    }

    /**
     * @param {Array} listIds
     *
     * @returns {Array}
     */
    static getEntitiesFromLists (listIds) {
        let combined = new Set();

        listIds.forEach((listId) => {
            (listId.split('.').reduce((acc, part) => acc[part] || {}, entities).entities || []).forEach((entity) => {
                combined.add(entity);
            });
        });

        return [...combined];
    }
}
