const domMatchers = require('jasmine-dom-custom-matchers')
const TextHeader = require('../../src/components/TextHeader')

describe('TextHeader', () => {
	let textHeader
	let props

	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
		props = {
			text: 'This is header'
		}
		textHeader = TextHeader(props)
	})

	it('should return div with class text-header', () => {
		expect(textHeader).toBeHTMLElement('div')
		expect(textHeader).toHaveClass('text-header')
	})

	it('should contain text', () => {
		expect(textHeader).toContainText(props.text)
	})
})
