const { create, draw } = require('./utils/dom')
const { withRouter, Link, normalizeRoute } = require('./utils/router')
const style = require('./app.scss')
const NavBar = require('./components/NavBar')
const Feed = require('./components/Feed')
const Article = require('./components/Article')
const List = require('./components/List')
const TextHeader = require('./components/TextHeader')

const store = {
	appName: 'WWWID Reader',
	feeds: [
		{
			title: 'My Feed',
			author: 'Me',
			thumbnail: 'https://cdn-images-1.medium.com/max/939/1*DAksMcGmL2voVF39xrACQA.png',
			summary: 'This is my first feed.',
			content: '<p>This is my first feed.</p>',
			pubDate: new Date(),
			href: '/'
		}
	],
	categories: []
}

const withStore = (component, store) => (props) => {
	const wrapper = create('div')
	const processChange = () => {
		draw(component(props), wrapper)
	}
	Object.keys(store).map(key => {
		store['_'+key] = store[key]
		Object.defineProperty(store, key, {
			get: function() {
				console.log('get '+key)
				return this['_'+key]
			},
			set: function(value) {
				console.log('update '+key)
				this['_'+key] = value
				processChange()
			}
		})
	})
	processChange()
	return wrapper
}

const Home = (props) => {
	const home = create('div')
	const feeds = props.feeds.map((feed) => {
		home.append(Feed(feed))
	})
	return home
}

const Detail = (props) => {
	const id = props.route.params.id
	const article = props.feeds.reduce((selected, feed) => {
		return feed.id == id ? feed : selected
	}, null)
	const detail = article !== null ? Article(article) : create('div', {
		textContent: "Oop! There's nothing here"
	})
	return detail
}

const Filter = (props) => {
	const filter = create('div')
	const categories = props.categories.map((category) => Link({
		textContent: category,
		href: '/cat/'+category
	}))
	filter.append(
		TextHeader({ text: 'CATEGORIES' }),
		List({ items: categories })
	)
	return filter
}

const Category = (props) => {
	const wrapper = create('div')
	const feedWrapper = create('div')
	const category = props.route.params.category
	const feeds = props.feeds.filter((feed) => typeof feed.categories !== 'undefined' && feed.categories.includes(category)).map((feed) => feedWrapper.append(Feed(feed)))
	wrapper.append(
		TextHeader({ text: 'FEEDS UNDER "'+category+'"' }),
		feedWrapper
	)
	return wrapper
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

const Page = (props) => {
	if (props.route !== null) return props.route.component(props)
	else return create('div', {
		textContent: 'Page not found'
	})
}

const App = () => {
	const app = create('div')
	const Router = withRouter(Page, routes)
	app.append(
		NavBar({ title: store.appName }),
		Router(store)
	)
	return app
}



normalizeRoute()
const MainApp = withStore(App, store)
draw(MainApp(), document.getElementById('app'))

const sourceUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'

fetch(sourceUrl)
	.then((response) => response.json())
	.then((response) => {
		store.feeds = response.items.map((item, key) => {
			const feed = item
			const id = key + 1
			feed.id = id
			feed.summary = item.content.match(/<p>(.*?)<\/p>/)[0].replace(/<p>|<\/p>/, '')
			feed.href = '/article/' + id
			feed.pubDate = new Date(feed.pubDate)
		
			item.categories.map((category) => {
				if (!store.categories.includes(category)) store.categories.push(category)
			})

			return feed
		})
		store.categories.sort()
		console.log(store.categories)
	})
	.catch((error) => console.log('Something wrong', error))
