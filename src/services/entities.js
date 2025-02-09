import entities from '../data/entities';

export default class Entities {
    /**
     * @param {Array}  listIds
     * @param {Number} amount
     * @param {Array}  excludedEntities
     *
     * @returns {Array}
     */
    static get(listIds, amount, excludedEntities = []) {
        const availableEntities = this.getEntitiesFromLists(listIds)
            .filter((entity) => excludedEntities.indexOf(entity) < 0);

        this.#shuffle(availableEntities);

        return availableEntities.slice(0, amount);
    }

    /**
     * @param {Array} listIds
     *
     * @returns {Array}
     */
    static getEntitiesFromLists(listIds) {
        const combined = new Set();

        listIds.forEach((listId) => {
            (listId.split('.').reduce((acc, part) => acc[part] || {}, entities).entities || []).forEach((entity) => {
                combined.add(entity);
            });
        });

        return [...combined];
    }

    /**
     * Randomize array in-place using Durstenfeld shuffle algorithm.
     *
     * @param {Array} array
     */
    static #shuffle(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
