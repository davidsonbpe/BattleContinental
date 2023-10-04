const CACHE_NAME = 'v1_pwa-inty-Server',
    urlsToCache = [
    './',
    './index.html',
    './jquery-2.1.1.min.js',
    './pathfind.js',
    './c2runtime.js',
    './data.js',
    './images/d1024.png',
    './images/ads.jpg',
    './images/Skip-Ad-Series.png',
    './images/logo-sheet0.png',
    './images/background-default-000.jpg',
    './images/background2-default-000.jpg',
    './images/background3-default-000.jpg',
    './images/background4-default-000.jpg',
    './images/explosion1-sheet0.png',
    './images/player-sheet0.png',
    './images/playerlaser-sheet0.png',
    './images/gunflare-sheet0.png',
    './images/enemyspawner-sheet0.png',
    './images/enemybullet-sheet0.png',
    './images/enemybullet-sheet1.png',
    './images/bladeenemy-sheet0.png',
    './images/bladeenemy-sheet1.png',
    './images/bladeenemy-sheet2.png',
    './images/explosion2-sheet0.png',
    './images/explosion3-sheet0.png',
    './images/explosion3-sheet1.png',
    './images/explosion3-sheet2.png',
    './images/healthbar.png',
    './images/healthbg.png',
    './images/spikeyenemy-sheet0.png',
    './images/spikeyenemy-sheet1.png',
    './images/playerrocket-sheet0.png',
    './images/rocketpowerup-sheet0.png',
    './images/rocketsdisplay.png',
    './images/playerthrust-sheet0.png',
    './images/bugenemy-sheet0.png',
    './images/enemylaser-sheet0.png',
    './images/fighterenemy-sheet0.png',
    './images/fighterenemy-sheet1.png',
    './images/rocketbutton-sheet0.png',
    './images/sprite-sheet0.png',
    './images/backgrounddefault-sheet0.png',
    './images/blackhole940x-sheet0.png',
    './images/blackhole940x-sheet1.png',
    './images/blackhole940x2-sheet0.png',
    './images/blackhole940x2-sheet1.png',
    './images/sprite2-sheet0.png',
    './images/logmenu-sheet0.png',
    './images/sprite3-sheet0.png',
    './images/sprite4-sheet0.png',
    './media/lazer%20fire%201.m4a',
    './media/lazer%20fire%201.ogg',
    './media/explosion%201.m4a',
    './media/explosion%201.ogg',
    './media/retrolaser1.m4a',
    './media/retrolaser1.ogg',
    './media/lazer%20ricochet.m4a',
    './media/lazer%20ricochet.ogg',
    './media/explosion%204.m4a',
    './media/explosion%204.ogg',
    './media/squaremotif1.m4a',
    './media/squaremotif1.ogg',
    './media/upgrade1.m4a',
    './media/upgrade1.ogg',
    './media/tronblast1.m4a',
    './media/tronblast1.ogg',
    './media/jetloop1.m4a',
    './media/jetloop1.ogg',
    './media/explosion%203.m4a',
    './media/explosion%203.ogg',
    './media/explosion%202.m4a',
    './media/explosion%202.ogg',
    './media/retrolaser2.m4a',
    './media/retrolaser2.ogg',
    './media/grito.m4a',
    './media/grito.ogg',
    './icon-16.png',
    './icon-32.png',
    './icon-72.png',
    './icon-96.png',
    './icon-114.png',
    './icon-128.png',
    './icon-144.png',
    './icon-192.png',
    './icon-256.png',
    './icon-384.png',
    './icon-512.png',
    './loading-logo.png'
  ]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                return res
            }
            return fetch(e.request)
        })
    )
})
