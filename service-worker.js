const cacheName = 'wwwid'
const dataCacheName = 'wwwid-feeds'
const dataSourceUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'
const mainUrl = self.registration.scope

console.log(self)
console.log(mainUrl)
const filesToCache = [
	mainUrl,
	mainUrl + '#/',
	mainUrl + 'index.html',
	mainUrl + 'app.css',
	mainUrl + 'app.js',
	mainUrl + 'manifest.json',
	mainUrl + 'images/wwwid-192.png',
	mainUrl + 'images/wwwid-512.png',
	mainUrl + 'images/wwwid-small.png',
	mainUrl + 'images/wwwid-text.png',
	'https://fonts.googleapis.com/css?family=Roboto:400'
]

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(filesToCache)
		})
	)
})

self.addEventListener('activate', function(e) {
	e.waitUntil(
		caches.keys().then(function(keys) {
			return Promise.all(keys.map(function(key) {
				if (key !== cacheName && key !== dataCacheName) {
					return caches.delete(key)
				}
			}))
		})
	)
	return self.clients.claim()
})

self.addEventListener('fetch', function(e) {
	if (e.request.url.indexOf(dataSourceUrl) > -1) {
		e.respondWith(
			caches.open(dataCacheName).then(function(cache) {
				return fetch(e.request).then(function(response) {
					cache.put(e.request.url, response.clone())
					return response
				})
			})
		)
	} else {
		e.respondWith(
			caches.match(e.request).then(function(response) {
				return response || fetch(e.request)
			})
		)
	}
})
