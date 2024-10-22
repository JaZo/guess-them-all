// Plugins
import Components from 'unplugin-vue-components/vite';
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { createHtmlPlugin } from "vite-plugin-html";
import ViteFonts from 'unplugin-fonts/vite';
import pkg from './package.json';

const base = process.env.NODE_ENV === 'production' ? '/guess-them-all/' : '/';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Vue({
            template: { transformAssetUrls },
        }),
        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    title: pkg.description,
                    base: base,
                },
            },
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
        Vuetify({
            autoImport: true,
            styles: {
                configFile: 'src/styles/settings.scss',
            },
        }),
        Components(),
        ViteFonts({
            google: {
                families: [{
                    name: 'Roboto',
                    styles: 'wght@100;300;400;500;700;900',
                }],
            },
        }),
    ],
    define: { 'process.env': {} },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
        ],
    },
    server: process.env.IS_DDEV_PROJECT ? {
        strictPort: true,
        host: true,
        hmr: {
            host: process.env.DDEV_HOSTNAME.split(',')[0],
            clientPort: 443,
            protocol: 'wss',
        },
    } : {},
});
