'use strict';
const BASE=new URL('./',self.location.href).href;
const CACHE='oxytime-v6-1-'+BASE;
const INDEX=new URL('./index.html?v=6.1',BASE).href;
const ASSETS=['./index.html?v=6.1','./oxytime-v6-1.css','./oxytime-v6-1-core.js','./oxytime-v6-1-app.js','./manifest.webmanifest?v=6.1','./icons/logo.svg','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
const keys=await caches.keys();const oldV5='oxytime-v5-'+BASE;
await Promise.all(keys.filter(k=>(k.startsWith(oldV5)||k==='oxytime-v6-shell-20261026-1'||k.startsWith('oxytime-v6-1-'+BASE))&&k!==CACHE).map(k=>caches.delete(k)));
await self.clients.claim();for(const client of await self.clients.matchAll())client.postMessage({type:'OXYTIME_READY'});
})()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith(BASE))return;
if(r.mode==='navigate'){e.respondWith((async()=>{try{const net=await fetch(r);if(net.ok)return net;}catch{}return (await caches.open(CACHE)).match(INDEX);})());return;}
const known=ASSETS.map(p=>new URL(p,BASE).href);if(!known.includes(r.url))return;
e.respondWith(caches.open(CACHE).then(async c=>(await c.match(r))||fetch(r)));
});