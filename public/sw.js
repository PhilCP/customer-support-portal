/* eslint-disable no-restricted-globals */
/* eslint-env serviceworker */
/* global importScripts, workbox */


importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/tickets'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'ticket-api',
    })
  );

  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === 'script' ||
      request.destination === 'style' ||
      request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );
}
