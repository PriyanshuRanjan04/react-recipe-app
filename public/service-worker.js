const CACHE_NAME = 'dishcovery-cache-v1'
const ASSETS = [
    '/',
    '/index.html'
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
    const { request } = event
    const url = new URL(request.url)
    if (request.method !== 'GET') return

    // Cache-first for images and recipe API responses
    if (url.pathname.startsWith('/img') || url.pathname.includes('/api/recipes')) {
        event.respondWith(
            caches.match(request).then((cached) => {
                const network = fetch(request).then((res) => {
                    const resClone = res.clone()
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone))
                    return res
                }).catch(() => cached)
                return cached || network
            })
        )
    }
})

self.addEventListener('push', (event) => {
    const data = event.data?.json?.() || { title: 'Dishcovery', body: 'Recipe of the Day is ready!' }
    event.waitUntil(
        self.registration.showNotification(data.title || 'Dishcovery', {
            body: data.body || 'Recipe of the Day is ready!',
            icon: '/logo192.png'
        })
    )
})


