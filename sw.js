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
    "revision": "6b63d49eec2c0b735dea1697acf3237b"
  },
  {
    "url": "static/audio/ringing.7187257.mp3"
  },
  {
    "url": "static/audio/ticking.7e66da0.mp3"
  },
  {
    "url": "static/css/app.576da3125fe4dae8deb33499db77c911.css"
  },
  {
    "url": "static/js/app.b1f8d6d60b614a91e563.js"
  },
  {
    "url": "static/js/manifest.1f9988ab9f7deaff5079.js"
  },
  {
    "url": "static/js/vendor.f7aeb2236e4f979367b5.js"
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
