const { create, draw } = require('./utils/dom')
const { withRouter, normalizeRoute } = require('./utils/router')
const { withStore } = require('./utils/store')
const style = require('./app.scss')
const criticalStyle = require('./app.crit')
const NavBar = require('./components/NavBar')
const Home = require('./containers/Home')
const Detail = require('./containers/Detail')
const Filter = require('./containers/Filter')
const Category = require('./containers/Category')
const Page = require('./containers/Page')

const sourceUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'

const store = {
	appName: 'WWWID Reader',
	feeds: [
		{
			title: 'WWWID Reader',
			author: 'Admin',
			thumbnail: 'images/wwwid-192.png',
			summary: 'WWWID Reader is RSS feed reader for WWWID articles.',
			content: '<p>WWWID Reader is RSS feed reader for WWWID articles.</p>',
			pubDate: new Date(),
			href: '/'
		}
	],
	categories: []
}

const routes = [
	{
		location: '/',
		exact: true,
		component: Home
	},
	{
		location: '/filter',
		exact: true,
		component: Filter
	},
	{
		location: '/article/{id}',
		exact: false,
		component: Detail
	},
	{
		location: '/cat/{category}',
		exact: false,
		component: Category
	}
]

let lazyImages = []

const trackImages = () => {
	lazyImages = document.querySelectorAll('.lazy-image')
	loadImages()	
}

const loadImages = () => {
	lazyImages.forEach(img => {
		const position = img.getBoundingClientRect()
		if (isInViewport(position.y)) {
			const realSource = img.getAttribute('data-src')
			if (typeof realSource !== 'undefined' && realSource !== null) {
				img.src = realSource
				img.removeAttribute('data-src')
			}
		}
	})
} 

const isInViewport = (yPostion) => {
	if (yPostion > 0 && yPostion < 500) return true
	else return false
}

const App = () => {
	const app = create('div')
	const Router = withRouter(Page, routes, () => {
		trackImages()
	})
	app.append(
		NavBar({ title: store.appName }),
		Router(store)
	)
	return app
}

const MainApp = withStore(App, store)

const getFeeds = (sourceUrl) => {
	if ('caches' in window) {
		caches.match(sourceUrl).then(response => {
			if (response) {
				response.json().then(json => updateFeeds(json))
			}
		})
	}

	fetch(sourceUrl)
		.then(response => {
			response.json().then(json => updateFeeds(json))
		})
		.catch(error => console.log('Failed to fetch RSS feeds.', error))
}

const updateFeeds = (response) => {
	store.feeds = response.items.map((item, key) => {
		const feed = item
		const id = key + 1
		feed.id = id
		feed.summary = item.content.match(/<p>(.*?)<\/p>/)[0].replace(/<p>|<\/p>/, '')
		feed.href = '/article/' + id
		feed.pubDate = new Date(feed.pubDate)
	
		item.categories.map((category) => {
			if (!store.categories.includes(category)) store.categories.push(category.toLowerCase())
		})

		return feed
	})
	store.categories.sort()
	trackImages()
}

normalizeRoute()
getFeeds(sourceUrl)
draw(MainApp(), document.getElementById('app'))
trackImages()

window.addEventListener('load', loadImages)
window.addEventListener('scroll', loadImages)
