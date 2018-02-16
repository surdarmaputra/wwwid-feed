const domMatchers = require('jasmine-dom-custom-matchers')
const Meta = require('../../src/components/Meta')

describe('Meta', () => {
	let meta
	let props

	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
		props = {
			author: 'Me',
			pubDate: new Date()
		}
		meta = Meta(props)
	})

	it('should return div with class meta', () => {
		expect(meta).toBeHTMLElement('div')
		expect(meta).toHaveClass('meta')
	})
	
	it('should contain author', () => {
		const author = meta.children[0]
		expect(author).toBeHTMLElement('span')
		expect(author).toHaveClass('meta__author')
		expect(author).toContainText('by ' + props.author)
	})
	
	it('should contain publication date', () => {
		const date = meta.children[1]
		const pubDate = props.pubDate
		const shownDate = pubDate.getFullYear() + '-' + ('0' + pubDate.getMonth()).slice(-2) + '-' + ('0' + pubDate.getDate()).slice(-2)
		expect(date).toBeHTMLElement('span')
		expect(date).toHaveClass('meta__date')
		expect(date).toContainText('at ' + shownDate)
	})
})
