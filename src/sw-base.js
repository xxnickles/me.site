importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    new workbox.strategies.CacheFirst({
        cacheName: 'googleapis',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
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

workbox.precaching.precacheAndRoute([]);