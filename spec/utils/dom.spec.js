const dom = require('../../src/utils/dom')
const domMatchers = require('jasmine-dom-custom-matchers')

describe('dom utils', () => {
	let domUtil
	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
	})

	describe('create', () => {
		const { create } = dom
		it('should create HTML element', () => {
			const div = create('div')
			expect(div).toBeHTMLElement('div')
		})

		it('should set props of created HTML element', () => {
			const props = {
				className: 'custom-div'
			}
			const div = create('div', props)
			expect(div).toHaveClass(props.className)
		})
	})
})
