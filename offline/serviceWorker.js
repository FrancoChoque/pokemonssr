/* eslint-disable no-restricted-globals */
/* global  self caches fetch */

/* const CACHE_NAME = 'simple-cache-v1';

self.addEventListener('install', (event) => {
  const preLoaded = caches.open(CACHE_NAME);
  console.log('service worker installed');
  event.waitUntil(preLoaded);
});

self.addEventListener('fetch', (event) => {
  const response = caches.match(event.request)
    .then(match => match || fetch(event.request));
  event.respondWith(response);
});

self.addEventListener('activate', () => {
  console.log('activated');
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const { title } = data;

  const body = {
    body: data.body,
    icon: data.icon,
  };

  event.waitUntil(self.registration.showNotification(title, body));
});
 */