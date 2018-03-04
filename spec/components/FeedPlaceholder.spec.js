const domMatchers = require('jasmine-dom-custom-matchers')
const FeedPlaceholder = require('../../src/components/FeedPlaceholder')

describe('FeedPlaceholder', () => {
	let feed
	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
		feed = FeedPlaceholder()
	})

	it('should be a div element', () => {
		expect(feed).toBeHTMLElement('div')
		expect(feed).toHaveClass('feed')
	})

	it('should contain empty thumbnail', () => {
		const thumbnail = feed.children[0]
		expect(thumbnail).toBeHTMLElement('div')
		expect(thumbnail).toHaveClass('feed__thumbnail')
		expect(thumbnail).toHaveClass('feed__thumbnail--empty')
	})

	it('should contain info', () => {
		const info = feed.children[1]
		expect(info).toBeHTMLElement('div')
		expect(info).toHaveClass('feed__info')
	})
	
	it('should contain empty title inside info', () => {
		const title = feed.children[1].children[0]
		expect(title).toBeHTMLElement('div')
		expect(title).toHaveClass('title')
		expect(title).toHaveClass('title--empty')
	})

	it('should contain empty meta inside info', () => {
		const meta = feed.children[1].children[1]
		expect(meta).toBeHTMLElement('div')
		expect(meta).toHaveClass('meta')
		expect(meta).toHaveClass('meta--empty')
	})

	it('should contain empty content inside info', () => {
		const content = feed.children[1].children[2]
		expect(content).toBeHTMLElement('div')
		expect(content).toHaveClass('content')
		expect(content).toHaveClass('content--empty')
	})

	it('should contain empty paragraph line inside content', () => {
		const contentChildren = feed.children[1].children[2].children
		for (let i = 0; i < 8; i++) {
			expect(contentChildren[i]).toBeHTMLElement('div')
			expect(contentChildren[i]).toHaveClass('paragraph-line')
		}
		expect(contentChildren[7]).toHaveClass('paragraph-line--half')
	})
})
