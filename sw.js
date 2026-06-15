const CACHE='planner-v3';
const ASSETS=[
  'https://deepaksuresh5.github.io/planner/',
  'https://deepaksuresh5.github.io/planner/index.html',
  'https://deepaksuresh5.github.io/planner/manifest.json',
  'https://deepaksuresh5.github.io/planner/icons/icon-192.png',
  'https://deepaksuresh5.github.io/planner/icons/icon-512.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('firebasejs')||e.request.url.includes('googleapis')){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)).catch(()=>caches.match('/index.html')));
});
