// Plugins
import Components from 'unplugin-vue-components/vite';
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { createHtmlPlugin } from "vite-plugin-html";
import ViteFonts from 'unplugin-fonts/vite';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json';

const base = process.env.NODE_ENV === 'production' ? '/guess-them-all/' : '/';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
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
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: pkg.description,
                short_name: pkg.description,
                theme_color: '#6750a4',
                background_color: '#000000',
                icons: [
                    {
                        src: './img/icons/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/android-chrome-maskable-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: './img/icons/android-chrome-maskable-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,mp3,eot,ttf,woff,woff2}'],
                runtimeCaching: [
                    {
                        urlPattern: new RegExp('fonts.(gstatic|googleapis).com/(.*)'),
                        handler: 'StaleWhileRevalidate',
                    },
                ],
                navigateFallback: '/',
                directoryIndex: 'index.html',
            },
        }),
    ],
    define: { 'process.env': {} },
    css: {
        preprocessorOptions: {
            sass: {
                api: 'modern-compiler',
            },
        },
    },
    base: base,
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
