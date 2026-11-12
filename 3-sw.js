/* Cache of the application only. Garage data stays in this browser. */
const CACHE='mecagestion-1addf6d3b2f4';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-180.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mecagestion-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin)return;
if(req.mode==='navigate'){event.respondWith(fetch(req).then(response=>{if(!response.ok)throw new Error('HTTP '+response.status);return response;}).catch(()=>caches.match('./index.html')));return;}
if(ASSETS.some(path=>new URL(path,self.registration.scope).href===url.href)){event.respondWith(caches.match(req).then(hit=>hit||fetch(req)));}
});
