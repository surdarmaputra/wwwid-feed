const domMatchers = require('jasmine-dom-custom-matchers')
const List = require('../../src/components/List')

describe('List', () => {
	let list
	let props
	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
	})

	describe('list of string', () => {
		beforeAll(() => {
			props = {
				items: [
					'Item 1',
					'Item 2',
					'Item 3'
				]
			}
			list = List(props)
		})

		it('should return ul element with class list', () => {
			expect(list).toBeHTMLElement('ul')
			expect(list).toHaveClass('list')
		})

		it('should render correct amount of item', () => {
			expect(list.children.length).toBe(props.items.length)
		})

		it('should render each item', () => {
			for (let index = 0; index < list.children.length; index++){
				expect(list.children[index]).toBeHTMLElement('li')
				expect(list.children[index]).toHaveClass('list__item')
				expect(list.children[index]).toContainText(props.items[index])
			}
		})
	})
	
	describe('list of HTML element', () => {
		beforeAll(() => {
			let items = []
			for (let i = 0; i < 5; i++) {
				const component = document.createElement('div')
				component.id = 'component-' + i
				items.push(component)
			}
			props = {
				items
			}
			list = List(props)
		})

		it('should return ul element with class list', () => {
			expect(list).toBeHTMLElement('ul')
			expect(list).toHaveClass('list')
		})

		it('should render correct amount of item', () => {
			expect(list.children.length).toBe(props.items.length)
		})

		it('should render each HTML element', () => {
			for (let index = 0; index < list.children.length; index++){
				expect(list.children[index]).toBeHTMLElement('li')
				expect(list.children[index]).toHaveClass('list__item')
				expect(list.children[index]).toContainHTMLElement(props.items[index])
			}
		})
	})

})
