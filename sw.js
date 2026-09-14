// Service worker: la app funciona sin conexión y guarda los mosaicos del mapa que ya se hayan visto.
const VERSION = 'mapeo-v6';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js', 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js', 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js'];
const TILES = 'mapeo-tiles';
const MAX_TILES = 4000;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname.endsWith('arcgisonline.com')) {
    // Mosaicos: primero caché, si no hay se descarga y se guarda.
    e.respondWith(caches.open(TILES).then(async c => {
      const hit = await c.match(e.request); if (hit) return hit;
      try { const r = await fetch(e.request); if (r.ok) { c.put(e.request, r.clone()); recortar(c); } return r; }
      catch { return new Response('', { status: 503 }); }
    }));
    return;
  }
  if (url.origin === location.origin || url.hostname === 'unpkg.com' || url.hostname === 'www.gstatic.com') {
    // Archivos de la app: red primero (para recibir actualizaciones), caché si no hay conexión.
    e.respondWith(fetch(e.request).then(r => { caches.open(VERSION).then(c => c.put(e.request, r.clone())); return r; }).catch(() => caches.match(e.request)));
  }
});
let contando = false;
async function recortar(c) {
  if (contando) return; contando = true;
  const keys = await c.keys();
  if (keys.length > MAX_TILES) await Promise.all(keys.slice(0, keys.length - MAX_TILES).map(k => c.delete(k)));
  contando = false;
}
