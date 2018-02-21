const sanitizeHtml = require('sanitize-html')
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
				return this['_'+key]
			},
			set: function(value) {
				this['_'+key] = value
				processChange()
			}
		})
	})
	processChange()
	return wrapper
}

const setPageTitle = (appName, title) => {
	document.head.querySelector('title').textContent = title + ' - ' + appName
}

const setPageDescription = ({ author, pubDate, categories, summary}) => {
	const descriptionMeta = []
	if (typeof author !== 'undefined') descriptionMeta.push('Author: ' + author)
	if (typeof pubDate !== 'undefined') descriptionMeta.push('Publication Date: ' +  pubDate)
	if (typeof categories !== 'undefined') descriptionMeta.push('Categories: ' + categories.join(', '))
	if (typeof summary !== 'undefined') descriptionMeta.push('Summary: ' + summary)

	const targetMeta = document.head.querySelector('meta[name="description"]')
	if (typeof targetMeta !== 'undefined') targetMeta.setAttribute('content', descriptionMeta.join(', '))
	else {
		document.heade.append(create('meta', {
			name: 'description',
			content: descriptionMeta.join(', ')
		}))
	}
}

const setPageDefaultDescription = (message) => {
	if (typeof message === 'undefined') message = "WWWID Reader, a simple yet powerfull RSS Feed reader for WWWID."
	const targetMeta = document.head.querySelector('meta[name="description"]')
	if (typeof targetMeta !== 'undefined') targetMeta.setAttribute('content', message)
	else {
		document.heade.append(create('meta', {
			name: 'description',
			content: message
		}))
	}

}

const Home = (props) => {
	const home = create('div', {
		className: 'feeds'
	})
	const feeds = props.feeds.map((feed) => {
		home.append(Feed(feed))
	})
	setPageTitle(props.appName, 'Home')
	setPageDefaultDescription()
	return home
}

const Detail = (props) => {
	const id = props.route.params.id
	const article = props.feeds.reduce((selected, feed) => {
		return feed.id == id ? feed : selected
	}, null)
	let detail
	if (article !== null) {
		detail = Article(article) 
		setPageTitle(props.appName, article.title)
		setPageDescription(article)
	} else {
		const message = "Oop! There's nothing here"
		detail = create('div', {
			textContent: message
		})
		setPageTitle(props.appName, message)
		setPageDefaultDescription(message)
	}
	return detail
}

const Filter = (props) => {
	const filter = create('div')
	const textBox = create('input', {
		type: 'text',
		className: 'search-box',
		placeholder: 'Search category',
		onkeyup: (event) => {
			const shownCategories = props.categories.map(category => {
				const item = filter.querySelector('#cat-'+category).closest('li')
				let className
				if (category.includes(event.target.value)) {
					className = 'list__item'				
				} else {
					className = 'list__item list__item--hidden'
				}					
				if (item.className !== className) item.className = className
			})
			
		}
	})
	const categories = props.categories.map((category) => Link({
		textContent: category,
		href: '/cat/'+category,
		id: 'cat-'+category
	}))
	filter.append(
		textBox,
		List({ items: categories })
	)
	setPageTitle(props.appName, 'Filter by category')
	setPageDefaultDescription('WWWID feed filter by category.')
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
	setPageTitle(props.appName, 'Feeds under ' + category + ' category')
	setPageDefaultDescription('WWWID feeds under ' + category + ' category')
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
	const page = create('div', {
		className: 'page'
	})
	if (props.route !== null) draw(props.route.component(props), page)
	else  {
		const notFound = create('div', {
			textContent: 'Page not found'
		})
		draw(notFound, page)
	}
	return page
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
			feed.summary = sanitizeHtml(item.content.match(/<p>(.*?)<\/p>/)[0].replace(/<p>|<\/p>/, ''))
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
