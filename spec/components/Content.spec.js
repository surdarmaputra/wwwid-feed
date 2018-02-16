const domMatchers = require('jasmine-dom-custom-matchers')
const Content = require('../../src/components/Content')

describe('Content', () => {
	let content
	let props

	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
		props = {
			content: '<p>This is my content.</p>'
		}
		content = Content(props)
	})

	it('should return div with class content', () => {
		expect(content).toBeHTMLElement('div')
		expect(content).toHaveClass('content')
	})

	it('should contain content', () => {
		expect(content.innerHTML).toBe(props.content)
	})
})
