const { create, draw } = require('./utils/dom')
const style = require('./app.scss')
const NavBar = require('./components/NavBar')
const Feed = require('./components/Feed')
const Article = require('./components/Article')

const store = {
	appName: 'WWWID Reader',
	feeds: [
		{
			title: 'My Feed',
			author: 'Me',
			thumbnail: 'https://cdn-images-1.medium.com/max/939/1*DAksMcGmL2voVF39xrACQA.png',
			summary: 'This is my first feed.',
			content: '<p>This is my first feed.</p>',
			pubDate: new Date()
		}
	]
}

const example = store.feeds[0]
for (let i = 0; i < 8; i++) {
	store.feeds.push(example)
}

const Home = (props) => {
	const home = create('div')
	const feeds = props.feeds.map((feed) => {
		home.append(Feed(feed))
	})
	return home
}

const Detail = (props) => {
	const detail = Article(props.feeds[0])
	return detail
}

const Page = (props) => {
	const routes = [
		{
			location: '/',
			exact: true,
			component: Home
		},
		{
			location: '/article',
			exact: false,
			component: Detail
		}
	]
	const page = routes.reduce((selected, current) => current.location === props.location ? current : selected, routes[0])
	return page.component(props)
}

const withRouter = (component, props) => {
	const hash = '/#'
	const wrapper = create('div')
	const route = getRoute()
	const processRoute = (route) => {
		const newProps = Object.assign({}, props, { 
			location: route
		})
		draw(component(newProps), wrapper)
	}
	if (location.href.indexOf(hash) === -1) {
		location.replace(location + '#/')
	}
	window.onhashchange = () => {
		const route = getRoute()
		processRoute(route)	
	}

	processRoute(route)
	return wrapper
}

const getRoute = () => {
	return location.hash.substr(1)
}

const setRoute = (route) => {
	location.hash = '#' + route
}

const App = () => {
	const app = create('div')
	const sampleLink = create('a', {
		textContent: 'Article',
		href: '/article',
		onclick: (event) => {
			event.preventDefault()
			console.log(event)
			setRoute(event.target.pathname)
		}
	})
	app.append(
		NavBar({ title: store.appName }),
		withRouter(Page, store),
		sampleLink
	)
	return app
}

draw(App(), document.getElementById('app'))
