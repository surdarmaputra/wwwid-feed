const domMatchers = require('jasmine-dom-custom-matchers')
const { 
	getRoute, 
	setRoute, 
	withRouter,
	Link
} = require('../../src/utils/router')

describe('router', () => {
	const routes = [
		{
			location: '/',
			exact: true,
			component: () => document.createElement('div')
		},
		{
			location: '/article/{id}',
			exact: false,
			component: () => document.createElement('span')
		}
	]

	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
	})

	describe('getRoute()', () => {	
		it('should return route object', () => {
			location.hash = '#/'
			const route = getRoute(routes)
			const expected = Object.assign({}, routes[0], {
				main: '/',
				params: {}
			})
			expect(route).toEqual(expected)
		})	

		it('should return usable component', () => {
			location.hash = '#/'
			const route = getRoute(routes)
			const expected = routes[0].component()
			expect(route.component()).toEqual(expected)
		})
		
		it('should return params', () => {
			location.hash = '#/article/1'
			const route = getRoute(routes)
			const expected = Object.assign({}, routes[1], {
				main: '/article',
				params: {
					id: '1'
				}
			})
			expect(route).toEqual(expected)
		})	
	})

	describe('withRouter()', () => {
		let Router
		const BareComponent = (props) => document.createElement('div')
		const DynamicComponent = (props) => props.component()
		const sampleProps = {
			title: 'Test Component'
		}
		beforeAll(() => {
			location.hash = '#/'
		})

		it('should return a component', () => {
			Router = withRouter(BareComponent, routes)
			RouterComponent = Router(sampleProps)
			expect(RouterComponent).toBeHTMLElement('div')
			expect(RouterComponent.children[0]).toBeHTMLElement(BareComponent())
		})	

		it('should return route object as props', () => {
			const CheckComponent = (props) => {
				const wrapper = document.createElement('div')
				wrapper.textContent = JSON.stringify(props)
				return wrapper
			}
			const expectedProps = Object.assign(
				{}, 
				sampleProps, 
				routes[0], {
					main: '/',
					params: {}
				}
			)
			const expectedChildren = CheckComponent(expectedProps)
			Router = withRouter(CheckComponent, routes)
			RouterComponent = Router(sampleProps)
			expect(RouterComponent.children[0]).toBeHTMLElement(expectedChildren)
		})
	})

	describe('setRoute()', () => {
		it('should set location hash', () => {
			const route = '/article/1'
			setRoute(route)
			expect(location.hash).toBe('#' + route)
		})
	})

	describe('Link', () => {
		const props = {
			href: '/article/1',
			className: 'custom-link',
			textContent: 'My Custom Link'
		}

		let link
		let bareLink
		beforeAll(() => {
			link = Link(props)			
			bareLink = Link()
		})

		it('should return a link component', () => {
			expect(link).toBeHTMLElement('a')
		})

		it('should have href', () => {
			expect(link.href).toBe(props.href)
		})

		it('should contain text', () => {
			expect(link).toContainText(props.textContent)
		})

		it('should have class', () => {
			expect(link.className).toBe(props.className)
		})

		it('should return a bare link if no props specified', () => {
			expect(bareLink).toBeHTMLElement('a')
			expect(bareLink.href).toBe('')
			expect(bareLink.className).toBe('')
			expect(bareLink).toContainText('')
		})
	})
})
