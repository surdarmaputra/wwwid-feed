const domMatchers = require('jasmine-dom-custom-matchers')
const Feed = require('../../src/components/Feed')

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
			pubDate: new Date()
		}
		feed = Feed(document, props)		
	})
	
	it('should be div element', () => {
		expect(feed).toBeHTMLElement('div')
		expect(feed).toHaveClass('feed')
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
		const a = title.children[0]
		expect(title).toBeHTMLElement('div')
		expect(title).toHaveClass('feed__title')
		expect(a).toBeHTMLElement('a')
		expect(a).toContainText(props.title)
	})

	it('should contain meta inside info', () => {
		const meta = feed.children[1].children[1]
		expect(meta).toBeHTMLElement('div')
		expect(meta).toHaveClass('feed__meta')
	})
	
	it('should contain author inside meta', () => {
		const author = feed.children[1].children[1].children[0]
		expect(author).toBeHTMLElement('span')
		expect(author).toHaveClass('feed__author')
		expect(author).toContainText('by ' + props.author)
	})
	
	it('should contain publication date inside meta', () => {
		const date = feed.children[1].children[1].children[1]
		const pubDate = props.pubDate
		const shownDate = pubDate.getFullYear() + '-' + ('0' + pubDate.getMonth()).slice(-2) + '-' + ('0' + pubDate.getDate()).slice(-2)
		expect(date).toBeHTMLElement('span')
		expect(date).toHaveClass('feed__date')
		expect(date).toContainText('at ' + shownDate)
	})

	it('should contain summary inside info', () => {
		const summary = feed.children[1].children[2]
		expect(summary).toBeHTMLElement('div')
		expect(summary).toHaveClass('feed__summary')
		expect(summary.innerHTML).toBe(props.summary)
	})
})

