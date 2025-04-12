
// Service Worker for caching and offline functionality
const CACHE_NAME = 'paraisodosbordados-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/favicon.ico',
  '/og-image.png',
  '/placeholder.svg'
];

// Install event - cache basic assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network-first strategy with fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  
  // Special handling for HTML pages - network-first
  if (event.request.mode === 'navigate' || 
      event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then((response) => {
              if (response) return response;
              return caches.match('/index.html');
            });
        })
    );
    return;
  }
  
  // Cache-first for assets
  if (
    event.request.destination === 'image' || 
    event.request.destination === 'style' ||
    event.request.destination === 'script' ||
    event.request.url.includes('lovable-uploads')
  ) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached response and update cache in background
            const fetchPromise = fetch(event.request)
              .then((networkResponse) => {
                caches.open(CACHE_NAME)
                  .then((cache) => cache.put(event.request, networkResponse.clone()));
                return networkResponse;
              })
              .catch(() => cachedResponse);
            
            return cachedResponse;
          }
          
          // Nothing in cache, fetch from network
          return fetch(event.request)
            .then((response) => {
              // Cache the fetched response
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseToCache));
              return response;
            });
        })
        .catch(() => {
          // If both cache and network fail, return fallback
          if (event.request.destination === 'image') {
            return caches.match('/placeholder.svg');
          }
          return new Response('Network error happened', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }
  
  // Network-first for API and other requests
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache fresh response
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(event.request, responseToCache));
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
