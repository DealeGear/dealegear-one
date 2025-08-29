const CACHE_NAME = 'crush-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/components.css',
  '/styles/themes.css',
  '/scripts/main.js',
  '/scripts/modules/api.js',
  '/scripts/modules/auth.js',
  '/scripts/modules/ui.js',
  '/scripts/modules/compatibility.js',
  '/scripts/modules/gamification.js',
  '/scripts/modules/chat.js',
  '/scripts/modules/toxicity.js',
  '/scripts/modules/i18n.js',
  '/scripts/pages/discover.js',
  '/scripts/pages/profile.js',
  '/scripts/pages/quests.js',
  '/scripts/pages/events.js',
  '/scripts/pages/settings.js',
  '/assets/logo.svg',
  '/assets/avatar-placeholder.svg',
  '/data/users.json',
  '/data/quests.json',
  '/data/events.json',
  '/data/i18n.json',
  '/data/toxicity.json',
  '/manifest.json'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          }
        );
      })
  );
});

// Push notification event
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/assets/logo.svg',
    badge: '/assets/logo.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Crush', options)
  );
});