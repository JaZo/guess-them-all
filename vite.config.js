import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue2';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { VitePWA as pwa } from 'vite-plugin-pwa';
import pkg from './package.json';

const base = process.env.NODE_ENV === 'production' ? '/guess-them-all/' : '/';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        vue(),
        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    title: pkg.description,
                    base: base,
                },
            },
        }),
        viteCommonjs(),
        pwa({
            registerType: 'autoUpdate',
            manifest: {
                name: pkg.description,
                short_name: pkg.description,
                theme_color: '#448AFF',
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
                globPatterns: ['**/*.{js,css,html,mp3}'],
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
