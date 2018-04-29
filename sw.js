importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "index.html",
    "revision": "17e70410656b79afb88e2a55a35ffd33"
  },
  {
    "url": "static/audio/ringing.7187257.mp3"
  },
  {
    "url": "static/audio/ticking.7e66da0.mp3"
  },
  {
    "url": "static/css/app.8a465cd94bc22d739379eb25690a7805.css"
  },
  {
    "url": "static/js/app.8712f68ea60faa14eae9.js"
  },
  {
    "url": "static/js/manifest.298480c389ad92a19b08.js"
  },
  {
    "url": "static/js/vendor.e5ba63d23b3dd602369a.js"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "guess-them-all",
  "skipWaiting": true,
  "clientsClaim": true,
  "directoryIndex": "index.html"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerNavigationRoute("/");workboxSW.router.registerRoute(/fonts.(gstatic|googleapis).com\/(.*)/, workboxSW.strategies.staleWhileRevalidate({}), 'GET');
