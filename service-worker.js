const scope = self.registration.scope;
const cachePrefix = 'holding-entry:' + scope + ':';
const cacheName = cachePrefix + 'v2';
const appShell = new URL('index.html', scope).href;
const assets = [
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png',
].map(path => new Request(new URL(path, scope), { cache: 'reload' }));
const assetURLs = new Set(assets.map(request => request.url));

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(cachePrefix) && key !== cacheName)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  url.search = '';
  const isAppNavigation = request.mode === 'navigate' &&
    (url.href === scope || url.href === appShell);
  if (!isAppNavigation && !assetURLs.has(request.url)) return;

  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(isAppNavigation ? appShell : request);
    return cached || fetch(request);
  })());
});
