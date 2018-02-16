const domMatchers = require('jasmine-dom-custom-matchers')
const Title = require('../../src/components/Title')

describe('Title', () => {
	let title
	let props

	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
		props = {
			text: 'My Title'
		}
		title = Title(props)
	})

	it('should return div with class title', () => {
		expect(title).toBeHTMLElement('div')
		expect(title).toHaveClass('title')
	})

	it('should contain a link with title text', () => {
		const a = title.children[0]
		expect(a).toBeHTMLElement('a')
		expect(a).toContainText(props.text)
	})
})
