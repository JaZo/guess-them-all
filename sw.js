/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/guess-them-all/precache-manifest.7a873b34ac880e1609d45c6f570dc21f.js"
);

workbox.core.setCacheNameDetails({prefix: "guess-them-all"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "directoryIndex": "index.html"
});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/"));

workbox.routing.registerRoute(/fonts.(gstatic|googleapis).com\/(.*)/, new workbox.strategies.StaleWhileRevalidate(), 'GET');