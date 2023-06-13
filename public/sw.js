// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.1/workbox-sw.js');
precacheAndRoute([{"revision":"13fdf671757a9f13c7f357c4f6bff3e0","url":"index.301580f7.js"},{"revision":"45d7bb352f701f7d0011be5951cc4eb5","url":"index.867122b9.css"},{"revision":"44e989814c932a2102b033976054bf81","url":"sw.js"}])

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