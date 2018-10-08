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
    "revision": "4ffc24791142f46159f5d4978003d1e6"
  },
  {
    "url": "app.3520ee44.js",
    "revision": "fbc8ba5460cc29d679438462e60a2706"
  },
  {
    "url": "app.724837c9.css",
    "revision": "5b35ad99869bc460fe50452669b94055"
  }
]);