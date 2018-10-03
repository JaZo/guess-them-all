let pkg = require('./package.json');

module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/guess-them-all/' : '/',

    pwa: {
        name: pkg.description,
        themeColor: '#448AFF',
        appleMobileWebAppCapable: true,

        // configure the workbox plugin
        workboxOptions: {
            swDest: 'sw.js',
            runtimeCaching: [
                {
                    urlPattern: new RegExp('fonts.(gstatic|googleapis).com/(.*)'),
                    handler: 'staleWhileRevalidate',
                },
            ],
            navigateFallback: '/',
            directoryIndex: 'index.html',
        },
    },
};
