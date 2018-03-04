const domMatchers = require('jasmine-dom-custom-matchers')
const ErrorPage = require('../../src/components/ErrorPage')

describe('ErrorPage', () => {
	let error
	let props
	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
		props = {
			title: 'Oops!',
			description: 'Nothing found here...',
			actionText: 'Back to Home',
			actionLink: '/'
		}
		error = ErrorPage(props)
	})

	it('should return a div element', () => {
		expect(error).toBeHTMLElement('div')
		expect(error).toHaveClass('error-page')
	})

	it('should contain title', () => {
		const title = error.children[0]
		expect(title).toBeHTMLElement('div')
		expect(title).toHaveClass('error-page__title')
	})

	it('should contain description', () => {
		const description = error.children[1]
		expect(description).toBeHTMLElement('div')
		expect(description).toHaveClass('error-page__description')
	})

	it('should contain action', () => {
		const action = error.children[2]	
		expect(action).toBeHTMLElement('a')
		expect(action).toContainText(props.actionText)
		expect(action).toHaveAttribute('href', props.actionLink)
	})
})
