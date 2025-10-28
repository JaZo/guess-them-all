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
                theme_color: '#57149f',
                background_color: '#57149f',
                icons: [
                    {
                        src: './img/icons/android/android-launchericon-512-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: './img/icons/android/android-launchericon-192-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: './img/icons/android/android-launchericon-144-144.png',
                        sizes: '144x144',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: './img/icons/android/android-launchericon-96-96.png',
                        sizes: '96x96',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: './img/icons/android/android-launchericon-72-72.png',
                        sizes: '72x72',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: './img/icons/android/android-launchericon-48-48.png',
                        sizes: '48x48',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: './img/icons/ios/16.png',
                        sizes: '16x16',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/20.png',
                        sizes: '20x20',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/29.png',
                        sizes: '29x29',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/32.png',
                        sizes: '32x32',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/40.png',
                        sizes: '40x40',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/50.png',
                        sizes: '50x50',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/57.png',
                        sizes: '57x57',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/58.png',
                        sizes: '58x58',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/60.png',
                        sizes: '60x60',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/64.png',
                        sizes: '64x64',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/72.png',
                        sizes: '72x72',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/76.png',
                        sizes: '76x76',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/80.png',
                        sizes: '80x80',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/87.png',
                        sizes: '87x87',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/100.png',
                        sizes: '100x100',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/114.png',
                        sizes: '114x114',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/120.png',
                        sizes: '120x120',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/128.png',
                        sizes: '128x128',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/144.png',
                        sizes: '144x144',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/152.png',
                        sizes: '152x152',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/167.png',
                        sizes: '167x167',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/180.png',
                        sizes: '180x180',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/256.png',
                        sizes: '256x256',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: './img/icons/ios/1024.png',
                        sizes: '1024x1024',
                        type: 'image/png',
                    }
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
