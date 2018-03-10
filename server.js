const express = require('express')
const axios = require('axios')
const cache = require('memory-cache')
const compression = require('compression')

const PORT = 3000
const CACHE_TIMEOUT = 86400000
const FEED_CACHE = 'feeds'
const FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'
const app = express()

const getFeeds = (feedUrl) => new Promise((resolve, reject) => {
	axios.get(feedUrl)
		.then(response => resolve(response.data))
		.catch(error => reject(error))
})

const fetchThenCacheFeeds = (feedUrl, cacheKey, cacheTimeout) => {
	return new Promise((resolve, reject) => {
		getFeeds(feedUrl)
			.then(response => {
				console.log('fetch success')
				cache.put(cacheKey, response, cacheTimeout, () => fetchThenCacheFeeds(feedUrl, cacheKey, cacheTimeout))
				resolve(response)
			})
			.catch(error => {
				console.log('fetch error')
				if (error.response) reject(error.response.data)
				else if (error.request) reject({ message: 'Unable to connect to remote server' })
				else reject({ message: 'Unexpected error' })
			})
	})	
}

app.use(compression())

app.get('/feeds', (req, res) => {
	const feeds = cache.get(FEED_CACHE)

	if (feeds) {
		console.log('using cache')
		res.send(feeds)
	} else {
		console.log('fetching...')
		fetchThenCacheFeeds(FEED_URL, FEED_CACHE, CACHE_TIMEOUT)
			.then(feeds => res.send(feeds))
			.catch(error => res.status(500).send(error))
	}
})

app.use('/', express.static('dist'))

app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`)
})
