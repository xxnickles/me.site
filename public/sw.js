importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");
workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
        cacheName: 'googleapis',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30,
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'static-resources',
    }),
);

workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.networkFirst()
);

workbox.precaching.precacheAndRoute([
  {
    "url": "app.21f0d3cb.js",
    "revision": "cf25e5c527a7d25b3ac3f97fe1a9179f"
  },
  {
    "url": "app.3520ee44.css",
    "revision": "3b78c4b8ab4c91671e6ac5d3b522bb15"
  },
  {
    "url": "app.3520ee44.js",
    "revision": "fcfa06901f98ab21c7d1b5aa72614c67"
  },
  {
    "url": "app.724837c9.css",
    "revision": "5b35ad99869bc460fe50452669b94055"
  }
]);