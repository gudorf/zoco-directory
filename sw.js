const CACHE_NAME = 'zoco-directory-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/images/zoco-logo.png',
    '/images/project-analyzer-thumb.png.jpg'  // <-- Add this line
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});