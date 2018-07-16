"use strict";

let staticCacheName = 'tr-v1';
let contentImgsCache = 'tr-content-imgs';
let allCaches = [
    staticCacheName,
    contentImgsCache
];

self.addEventListener('install', event => {

    caches.open(staticCacheName).then( cache => {
        return cache.addAll([
            '.',
            '/index.html'
            // '/img/map-placeholder-320w.jpg',
            // '/img/tr.png',
            // '/img/favicon.ico',
            // '/img/placeholder.png'
        ]);
    })

});

self.addEventListener('activate', function (event) {

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            console.log('activated');
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('tr-') &&
                        !allCaches.includes(cacheName);
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );

});