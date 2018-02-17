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

const routes = [
	{
		location: '/',
		exact: true,
		component: Home
	},
	{
		location: '/article/{id}',
		exact: false,
		component: Detail
	}
]

const Page = (props) => {
	return props.route.component(props)
}

const withRouter = (component, props) => {
	const hash = '/#'
	const wrapper = create('div')
	const route = getRoute()
	const processRoute = (route) => {
		const newProps = Object.assign({}, props, { 
			route
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
	const currentLocation = location.hash.substr(1)
	const paramsRegex = /{(.*?)}/g
	const currentRoute = routes.reduce((selected, route) => {
		const location = route.location.replace(/(\/{(.*?)})/g, '')
		const additionalInfo = {
			main: location
		}
		if (route.exact) {
			return currentLocation === location ? Object.assign({}, route, additionalInfo) : selected
		} else {
			return currentLocation.search(location) > -1 ? Object.assign({}, route, additionalInfo) : selected
		}
	}, null)
	let routeParams = currentRoute.location.match(paramsRegex)
	if (routeParams !== null) routeParams = routeParams.map(param => param.replace(/{|}/g, ''))
	else routeParams = []
	console.log(routeParams)
	const locationParams = currentLocation.replace(currentRoute.main, '').split('/').filter(param => param !== '')
	currentRoute.params = {}
	routeParams.forEach((param, index) => {
		currentRoute.params[param] = locationParams[index]
	})
	console.log(locationParams)
	console.log(currentRoute)
	return currentRoute
}

const setRoute = (route, params) => {
	location.hash = '#' + route
	return {
		location: route,
		params: typeof params === 'object' ? params : null
	}
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
