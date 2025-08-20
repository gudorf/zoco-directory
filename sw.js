const CACHE_NAME = 'zoco-directory-v2'; // <-- Change this version number with each update
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/images/zoco-logo.png',
    '/images/yt-analyzer.png',
    '/images/church-connector.png',
    '/images/zachgraphic.png',
    '/images/htc.png',
    '/images/yoto.png',
    '/images/fusion.png',
    '/images/guitar.png'
];

// Installs the service worker and caches the new files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Deletes old caches when a new service worker is activated
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Serves files from the cache for offline access (cache-first strategy)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});