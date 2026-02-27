/**
 * StudioOS Service Worker
 *
 * Progressive Web App service worker with offline-first architecture,
 * background sync, push notifications, and advanced caching strategies.
 *
 * @version 1.0.0
 */

/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

// Cache names
const CACHE_NAMES = {
  static: 'studioos-static-v1.0.0',
  images: 'studioos-images-v1.0.0',
  api: 'studioos-api-v1.0.0',
  documents: 'studioos-documents-v1.0.0',
  fonts: 'studioos-fonts-v1.0.0',
};

// Precache static assets
precacheAndRoute([
  { url: '/', revision: null },
  { url: '/manifest.json', revision: null },
  { url: '/favicon.ico', revision: null },
  { url: '/robots.txt', revision: null },
  // Add more static assets as needed
]);

// Background sync for offline actions
const bgSyncPlugin = new BackgroundSyncPlugin('offline-queue', {
  maxRetentionTime: 24 * 60, // 24 hours
  onSync: async ({ queue }) => {
    let entry;
    while ((entry = await queue.shiftRequest())) {
      try {
        await fetch(entry.request.clone());
      } catch (error) {
        await queue.unshiftRequest(entry);
        throw error;
      }
    }
  },
});

// Static assets - Cache First strategy
registerRoute(
  ({ request }) => request.destination === 'script' ||
                   request.destination === 'style' ||
                   request.url.includes('/_next/static/'),
  new CacheFirst({
    cacheName: CACHE_NAMES.static,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Images - Cache First with expiration
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: CACHE_NAMES.images,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        purgeOnQuotaError: true,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Fonts - Cache First with long expiration
registerRoute(
  ({ request }) => request.url.includes('/fonts/') ||
                   request.url.includes('fonts.googleapis.com') ||
                   request.url.includes('fonts.gstatic.com'),
  new CacheFirst({
    cacheName: CACHE_NAMES.fonts,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// API routes - Network First with background sync
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: CACHE_NAMES.api,
    plugins: [
      bgSyncPlugin,
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 5, // 5 minutes
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Documents and user content - Stale While Revalidate
registerRoute(
  ({ url }) => url.pathname.includes('/documents/') ||
                url.pathname.includes('/projects/') ||
                url.pathname.includes('/clients/'),
  new StaleWhileRevalidate({
    cacheName: CACHE_NAMES.documents,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24, // 24 hours
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Install event - skip waiting for new version
self.addEventListener('install', (event) => {
  console.log('StudioOS SW: Installing new version');
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('StudioOS SW: Activating new version');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old cache versions
          if (!Object.values(CACHE_NAMES).includes(cacheName)) {
            console.log('StudioOS SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients
      return self.clients.claim();
    })
  );
});

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey,
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icons/checkmark.png',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('StudioOS SW: Notification click received.');

  event.notification.close();

  if (event.action === 'explore') {
    // Open the app and navigate to relevant page
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      type: 'VERSION',
      version: '1.0.0',
      cacheNames: CACHE_NAMES,
    });
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith('studioos-')) {
              console.log('StudioOS SW: Clearing cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }).then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      })
    );
  }
});

// Periodic background sync for data synchronization
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncData());
  }
});

// Background sync function
async function syncData() {
  console.log('StudioOS SW: Performing background sync');

  try {
    // Sync offline changes
    const cache = await caches.open(CACHE_NAMES.api);
    const keys = await cache.keys();

    for (const request of keys) {
      if (request.url.includes('/api/')) {
        try {
          await fetch(request);
          await cache.delete(request);
        } catch (error) {
          console.error('StudioOS SW: Background sync failed for:', request.url);
        }
      }
    }

    // Notify clients of sync completion
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: 'SYNC_COMPLETED',
        timestamp: Date.now(),
      });
    });

  } catch (error) {
    console.error('StudioOS SW: Background sync error:', error);
  }
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('StudioOS SW: Error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('StudioOS SW: Unhandled rejection:', event.reason);
});
