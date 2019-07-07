importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
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
    "revision": "0af98b03ad29706ad8826ab9a143fca3"
  },
  {
    "url": "app.3520ee44.js",
    "revision": "3e32962531ed437530350a3bf135408b"
  },
  {
    "url": "app.61592c50.css",
    "revision": "24985424ffc940de172a946bbb196576"
  },
  {
    "url": "app.61592c50.js",
    "revision": "2f47fd073f0fa688554bbab31da5a039"
  },
  {
    "url": "app.724837c9.css",
    "revision": "5b35ad99869bc460fe50452669b94055"
  }
]);