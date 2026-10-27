/* Scoped strictly to the OxyTime directory. */
const CACHE='oxytime-v6-shell-20261026-1';
const BASE=new URL('./',self.location.href).href;
const ASSETS=['./','./index.html','./styles.css','./core.js','./app.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('oxytime-v6-shell-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})());});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||!req.url.startsWith(BASE))return;
const url=new URL(req.url);const known=ASSETS.some(p=>new URL(p,BASE).pathname===url.pathname);if(!known&&req.mode!=='navigate')return;
event.respondWith((async()=>{const cache=await caches.open(CACHE);if(req.mode==='navigate'){try{const response=await fetch(req);if(response.ok)return response;}catch{}return await cache.match(new URL('./index.html',BASE).href);}
return await cache.match(req,{ignoreSearch:true})||fetch(req);})());});