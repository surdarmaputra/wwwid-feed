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

	describe('draw', () => {
		const { draw } = dom
		it('should draw element into another element', () => {
			const app = document.createElement('div')
			app.id = 'app'
			document.body.append(app)

			const element = document.createElement('div')
			element.id = 'child'

			draw(element, app)
			expect(app).toContainHTMLElement(element)
		})
		
		it('should clean target descendant if target already have child element', () => {
			const app = document.createElement('div')
			app.id = 'app'
			document.body.append(app)

			const element = document.createElement('div')
			element.id = 'child'

			const anotherElement = document.createElement('div')
			anotherElement.id = 'another-child'

			draw(element, app)
			draw(anotherElement, app)
			expect(app.children.length).toBe(1)
			expect(app).toContainHTMLElement(anotherElement)
		})

	})
})
