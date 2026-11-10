/*
 * Service worker do Estudo PR: deixa o app funcionando sem internet.
 *  - Páginas: rede primeiro; sem conexão, usa a última versão salva.
 *  - Arquivos do build (/assets, com hash no nome), imagens e fontes: cache primeiro.
 *  - APIs (Firebase, Google Drive) nunca passam pelo cache.
 */
const VERSION = 'estudo-pr-v1';
const SHELL = ['/'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const cacheable = url =>
  (url.origin === self.location.origin && (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/img/'))) ||
  url.hostname === 'fonts.googleapis.com' ||
  url.hostname === 'fonts.gstatic.com';

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put('/', copy));
          return res;
        })
        .catch(() => caches.match('/')),
    );
    return;
  }

  if (!cacheable(url)) return;
  event.respondWith(
    caches.match(req).then(
      hit =>
        hit ||
        fetch(req).then(res => {
          if (res.ok || res.type === 'opaque') {
            const copy = res.clone();
            caches.open(VERSION).then(c => c.put(req, copy));
          }
          return res;
        }),
    ),
  );
});
