const domMatchers = require('jasmine-dom-custom-matchers')
const NavBar = require('../../src/components/NavBar')

describe('NavBar', () => {
	let navbar
	let props

	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
		props = {
			title: 'WWWID READER'
		}
		navbar = NavBar(props)
	})

	it('should return div element with class navbar', () => {
		expect(navbar).toBeHTMLElement('div')
		expect(navbar).toHaveClass('navbar')
	})

	it('should have home navigation', () => {
		const backNavigation = navbar.children[0]
		expect(backNavigation).toBeHTMLElement('a')
		expect(backNavigation).toHaveClass('navbar__button')		
		expect(backNavigation).toHaveClass('navbar__button--left')
	})

	it('should have title', () => {
		const title = navbar.children[1]
		expect(title).toBeHTMLElement('div')
		expect(title).toHaveClass('navbar__title')
	})

	it('should have filter navigation', () => {
		const filter = navbar.children[2]
		expect(filter).toBeHTMLElement('a')
		expect(filter).toHaveClass('navbar__button')
		expect(filter).toHaveClass('navbar__button--right')
	})
})
