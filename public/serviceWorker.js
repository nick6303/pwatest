const cacheName = 'penueling'

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(['./', './index.html', './manifest.json'])
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .open(cacheName)
      .then((cache) => cache.match(event.request, { ignoreSearch: true }))
      .then((response) => {
        return response || fetch(event.request)
      })
  )
})

self.addEventListener('activate', (event) => {
  console.log('now ready to handle fetches!')
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      var promiseArr = cacheNames.map(function (item) {
        if (item !== cacheName) {
          // Delete that cached file
          return caches.delete(item)
        }
      })
      return Promise.all(promiseArr)
    })
  )
})
