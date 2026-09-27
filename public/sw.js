const CACHE_NAME_STATIC = 'belhide-static-v1';
const CACHE_NAME_DYNAMIC = 'belhide-dynamic-v1';
const CACHE_NAME_CARE = 'belhide-care-v1';

const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/icon.png',
  '/icon.svg',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.png'
];

// Service Worker Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME_STATIC).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[Service Worker] Non-critical pre-cache warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Service Worker Activation & Old Cache Clean-up
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME_STATIC, CACHE_NAME_DYNAMIC, CACHE_NAME_CARE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('[Service Worker] Removing legacy cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy (Stale-While-Revalidate with Cache Fallback for Offline)
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip cross-origin chrome extensions, hot reloads, socket.io, etc.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            const targetCache = url.pathname.includes('/care') ? CACHE_NAME_CARE : CACHE_NAME_DYNAMIC;
            caches.open(targetCache).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request fails, return cached response or fallback
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('/') || new Response('Offline - Belhide Hub', { status: 503, headers: { 'Content-Type': 'text/html' } });
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// Background Sync Listener for Offline Product Registrations
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-registrations') {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'BACKGROUND_SYNC_COMPLETE', tag: event.tag });
        });
      })
    );
  }
});

// Web Push Notification Listener
self.addEventListener('push', (event) => {
  let data = { title: 'B Links — Belhide', body: 'New seasonal drop & leather care tips available!', url: '/' };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
    actions: [
      { action: 'explore', title: 'Explore Hub' },
      { action: 'care', title: 'Care Guide' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification Click Listener
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// Custom Client Messages Handler
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'SIMULATE_PUSH') {
    self.registration.showNotification(event.data.payload.title || 'Belhide VIP Alert', {
      body: event.data.payload.body || 'Exclusive drop active on Belhide Hub.',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      data: { url: event.data.payload.url || '/' },
    });
  }
});
