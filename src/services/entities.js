import entities from '../data/entities';

export default class Entities {
    /**
     * @param {Number} amount
     * @param {Array}  excludedEntities
     *
     * @returns {Array}
     */
    static get(amount, excludedEntities = []) {
        return this.combined()
            .filter((entity) => {
                return excludedEntities.indexOf(entity) < 0;
            }).sort(() => {
                return 0.5 - Math.random();
            }).slice(0, amount);
    }

    /**
     * @returns {Array}
     */
    static combined() {
        let combined = new Set();

        entities.nl.google.entities.forEach((entity) => {
            combined.add(entity);
        });

        entities.nl.susanne.entities.forEach((entity) => {
            combined.add(entity);
        });

        return [...combined];
    }
}
