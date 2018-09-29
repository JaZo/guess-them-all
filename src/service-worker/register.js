/* eslint-disable no-console */

import { register } from 'register-service-worker';

export default function (callbackInstalled, callbackUpdated) {
    register(`${process.env.BASE_URL}sw.js`, {
        ready () {
            /* console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB'
            ) */
        },
        cached () {
            callbackInstalled();
        },
        updated () {
            callbackUpdated();
        },
        offline () {
            /* console.log('No internet connection found. App is running in offline mode.') */
        },
        error (error) {
            console.error('Error during service worker registration:', error);
        },
    });
}
