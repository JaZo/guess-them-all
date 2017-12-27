export default function (callbackInstalled, callbackUpdated) {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').then(registration => {
                // updatefound is fired if sw.js changes.
                registration.onupdatefound = () => {
                    // The updatefound event implies that reg.installing is set
                    let installingWorker = registration.installing;

                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // At this point, the old content will have been purged and the fresh content will
                                // have been added to the cache.
                                // It's the perfect time to display a "New content is available; please refresh."
                                // message in the page's interface.
                                callbackUpdated();
                            } else {
                                // At this point, everything has been precached.
                                // It's the perfect time to display a "Content is cached for offline use." message.
                                callbackInstalled();
                            }
                        }
                    };
                };
            }).catch(registrationError => {
                // eslint-disable-next-line no-console
                console.warn('SW registration failed: ', registrationError);
            })
        })
    }
}
