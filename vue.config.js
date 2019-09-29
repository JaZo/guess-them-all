let pkg = require('./package.json');

function currentDateTime () {
    const date = new Date();

    let hour = date.getHours();
    hour = (hour < 10 ? '0' : '') + hour;

    let min = date.getMinutes();
    min = (min < 10 ? '0' : '') + min;

    let sec = date.getSeconds();
    sec = (sec < 10 ? '0' : '') + sec;

    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;

    let day = date.getDate();
    day = (day < 10 ? '0' : '') + day;

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

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
            clientsClaim: true,
            skipWaiting: true,
        },
    },

    pluginOptions: {
        ghPages: {
            message: () => `Automatic build ${currentDateTime()}`,
        },
    },
};
