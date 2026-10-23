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
import {md3} from 'vuetify/blueprints';

const light = {
    dark: false,
    colors: {
        background: '#fff7ff',
        'on-background': '#1e1a24',
        surface: '#fff7ff',
        'on-surface': '#1e1a24',
        'surface-container-lowest': '#ffffff',
        'on-surface-container-lowest': '#1e1a24',
        'surface-container-low': '#faf0ff',
        'on-surface-container-low': '#1e1a24',
        'surface-container': '#f5eaf9',
        'on-surface-container': '#1e1a24',
        'surface-container-high': '#efe5f4',
        'on-surface-container-high': '#1e1a24',
        'surface-container-highest': '#e9dfee',
        'on-surface-container-highest': '#1e1a24',
        'surface-variant': '#e9dfee',
        'on-surface-variant': '#4a4450',
        outline: '#7c7481',
        'outline-variant': '#ccc3d2',
        primary: '#57149f',
        'on-primary': '#ffffff',
        'primary-container': '#eedcff',
        'on-primary-container': '#450384',
        secondary: '#9f4200',
        'on-secondary': '#ffffff',
        'secondary-container': '#fa7627',
        'on-secondary-container': '#341100',
        tertiary: '#755b00',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#f4c430',
        'on-tertiary-container': '#241a00',
        // Full-bleed "ready" screen
        hero: '#57149f',
        'on-hero': '#ffffff',
        'hero-outline': '#aa78ed',
    },
};

const dark = {
    dark: true,
    colors: {
        background: '#16111b',
        'on-background': '#e9dfee',
        surface: '#16111b',
        'on-surface': '#e9dfee',
        'surface-container-lowest': '#110c16',
        'on-surface-container-lowest': '#e9dfee',
        'surface-container-low': '#1e1a24',
        'on-surface-container-low': '#e9dfee',
        'surface-container': '#221e28',
        'on-surface-container': '#e9dfee',
        'surface-container-high': '#2d2833',
        'on-surface-container-high': '#e9dfee',
        'surface-container-highest': '#38333e',
        'on-surface-container-highest': '#e9dfee',
        'surface-variant': '#38333e',
        'on-surface-variant': '#ccc3d2',
        outline: '#968e9b',
        'outline-variant': '#4a4450',
        primary: '#d8b9ff',
        'on-primary': '#450384',
        'primary-container': '#5c299c',
        'on-primary-container': '#eedcff',
        secondary: '#ffb692',
        'on-secondary': '#562000',
        'secondary-container': '#fa7627',
        'on-secondary-container': '#341100',
        tertiary: '#edc141',
        'on-tertiary': '#3d2e00',
        'tertiary-container': '#f4c430',
        'on-tertiary-container': '#241a00',
        hero: '#2f005e',
        'on-hero': '#eedcff',
        'hero-outline': '#7544b5',
    },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    blueprint: md3,
    theme: {
        defaultTheme: 'light',
        themes: {
            light,
            dark,
        },
    },
    defaults: {
        global: {
            hideDetails: 'auto',
        },
        VBtn: {
            variant: 'flat',
            rounded: 'pill',
        },
        VContainer: {
            fluid: true,
        },
    },
});
