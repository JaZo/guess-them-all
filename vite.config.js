// Plugins
import Components from 'unplugin-vue-components/vite';
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { createHtmlPlugin } from "vite-plugin-html";
import ViteFonts from 'unplugin-fonts/vite';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json' with { type: 'json' };

const base = process.env.NODE_ENV === 'production' ? '/guess-them-all/' : '/';

// Icon URLs carry the version so browsers pick up new icons after a release
const icon = (path, size, purpose) => ({
    src: `./img/icons/${path}?v=${pkg.version}`,
    sizes: `${size}x${size}`,
    type: 'image/png',
    ...(purpose ? {purpose} : {}),
});

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
                    version: pkg.version,
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
                    name: 'Roboto Flex',
                    styles: 'opsz,wdth,wght@8..144,25..151,100..1000',
                }],
            },
        }),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: pkg.description,
                short_name: pkg.description,
                theme_color: '#57149f',
                background_color: '#fff7ff',
                icons: [
                    ...[512, 192, 144, 96, 72, 48].map((size) => icon(`android/android-launchericon-${size}-${size}.png`, size, 'maskable')),
                    ...[16, 20, 29, 32, 40, 50, 57, 58, 60, 64, 72, 76, 80, 87, 100, 114, 120, 128, 144, 152, 167, 180, 192, 256, 512, 1024].map((size) => icon(`ios/${size}.png`, size)),
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
