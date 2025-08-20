const CACHE_NAME = 'zoco-directory-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/images/zoco-logo.png',
    '/images/yt-analyzer.png', // Also adding the first project's image for completeness
    '/images/church-connector.png'  // <-- Add this line for the new project
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