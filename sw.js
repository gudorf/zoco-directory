const CACHE_NAME = 'zoco-directory-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/images/zoco-logo.png',
    '/images/yt-analyzer.png',
    '/images/church-connector.png',
    '/images/zachgraphic.png',
    '/images/htc.png',
    '/images/yoto.png',      // <-- Add this line
    '/images/fusion.png',    // <-- Add this line
    '/images/guitar.png'     // <-- And this line
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