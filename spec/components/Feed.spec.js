const domMatchers = require('jasmine-dom-custom-matchers')
const Feed = require('../../src/components/Feed')
const Title = require('../../src/components/Title')
const Meta = require('../../src/components/Meta')
const Content = require('../../src/components/Content')

describe('Feed', () => {
	let feed
	let props
	
	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
		props = {
			title: 'My Feed',
			author: 'Me',
			thumbnail: 'sample.png',
			summary: 'This is my first feed.',
			pubDate: new Date(),
			href: '/article/1'
		}
		feed = Feed(props)		
	})
	
	it('should be a link element', () => {
		expect(feed).toBeHTMLElement('a')
		expect(feed).toHaveClass('feed')
	})

	it('should point to href', () => {
		expect(feed.href).toBe(props.href)
	})

	it('should contain thumbnail', () => {
		const thumbnail = feed.children[0]
		const img = thumbnail.children[0]
		expect(thumbnail).toBeHTMLElement('div')
		expect(thumbnail).toHaveClass('feed__thumbnail')
		expect(img).toBeHTMLElement('img')
		expect(img).toHaveAttribute('src', props.thumbnail)
	})

	it('should contain info', () => {
		const info = feed.children[1]
		expect(info).toBeHTMLElement('div')
		expect(info).toHaveClass('feed__info')
	})
	
	it('should contain title inside info', () => {
		const title = feed.children[1].children[0]
		const expected = Title({ text: props.title })
		expect(title).toEqual(expected)
	})

	it('should contain meta inside info', () => {
		const meta = feed.children[1].children[1]
		const expected = Meta(props)
		expect(meta).toEqual(expected)
	})

	it('should contain summary inside info', () => {
		const summary = feed.children[1].children[2]
		const expected = Content({ content: props.summary })
		expect(summary).toEqual(expected)
	})
})

