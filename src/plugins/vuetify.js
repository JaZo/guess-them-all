/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import {createVuetify} from 'vuetify';
import {md3} from 'vuetify/blueprints'

const theme = {
    ...md3.theme.themes.light,
    colors: {
        ...md3.theme.themes.light.colors,
        primary: '#57149f',
        secondary: '#fa7627',
        tertiary: '#f4c430',
    },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    blueprint: {
        ...md3,
        theme: {
            themes: {
                light: theme,
                dark: {
                    ...theme,
                    colors: {
                        ...theme.colors,
                        background: '#1e1f22',
                        surface: '#2b2d30',
                    }
                },
            },
        },
    },
    defaults: {
        global: {
            hideDetails: 'auto',
        },
        VContainer: {
            fluid: true,
        }
    },
});
