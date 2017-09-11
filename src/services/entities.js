import entities from '../data/entities/nl.json'

export default class Entities {
    /**
     * @param {Array} excludedEntities
     * @returns {Array}
     */
    static get(excludedEntities = []) {
        return entities.entities
            .filter((entity) => {
                return excludedEntities.indexOf(entity) < 0;
            }).sort(() => {
                return 0.5 - Math.random();
            }).slice(0, 5);
    }
}
