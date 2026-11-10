import {createPinia} from 'pinia';
import {createPersistence} from './persistence';

const pinia = createPinia();

pinia.use(createPersistence('game'));

export default pinia;
