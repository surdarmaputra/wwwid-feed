const { create, draw } = require('./dom')

const getRoute = (routes) => {
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
	const locationParams = currentLocation.replace(currentRoute.main, '').split('/').filter(param => param !== '')
	currentRoute.params = {}
	routeParams.forEach((param, index) => {
		currentRoute.params[param] = locationParams[index]
	})
	return currentRoute
}

const setRoute = (route) => location.hash = '#' + route

const withRouter = (component, routes) => (props) => {
	const hash = '#'
	const wrapper = create('div')
	const route = getRoute(routes)
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
		const route = getRoute(routes)
		processRoute(route)	
	}

	processRoute(route)
	return wrapper
}

const Link = (props) => {
	if (typeof props === 'undefined') props = {}
	const link = create('a', {
		className: val(props.className, ''),
		href: val(props.href, ''),
		textContent: val(props.textContent, ''),
		onclick: (event) => {
			event.preventDefault()
			setRoute(event.target.pathname)
		}
	})
	return link
}

const val = (value, defaultValue) => typeof value !== 'undefined' ? value : defaultValue

module.exports = {
	getRoute,
	setRoute,
	withRouter,
	Link
}
