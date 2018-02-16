const domMatchers = require('jasmine-dom-custom-matchers')
const Article = require('../../src/components/Article')
const Title = require('../../src/components/Title')
const Meta = require('../../src/components/Meta')
const Content = require('../../src/components/Content')

describe('Article', () => {
	let article
	let props
	
	beforeAll(() => {
		jasmine.addMatchers(domMatchers)
		props = {
			title: 'My Article',
			author: 'Me',
			thumbnail: 'sample.png',
			content: '<p>This is my first article.</p>',
			pubDate: new Date()
		}
		article = Article(props)		
	})
	
	it('should be div element', () => {
		expect(article).toBeHTMLElement('div')
		expect(article).toHaveClass('article')
	})

	it('should contain thumbnail', () => {
		const thumbnail = article.children[0]
		const img = thumbnail.children[0]
		expect(thumbnail).toBeHTMLElement('div')
		expect(thumbnail).toHaveClass('article__thumbnail')
		expect(img).toBeHTMLElement('img')
		expect(img).toHaveAttribute('src', props.thumbnail)
	})

	it('should contain body', () => {
		const body = article.children[1]
		expect(body).toBeHTMLElement('div')
		expect(body).toHaveClass('article__body')
	})
	
	it('should contain title inside body', () => {
		const title = article.children[1].children[0]
		const expected = Title({ text: props.title })
		expect(title).toEqual(expected)
	})

	it('should contain meta inside body', () => {
		const meta = article.children[1].children[1]
		const expected = Meta(props)
		expect(meta).toEqual(expected)
	})

	it('should contain content inside body', () => {
		const content = article.children[1].children[2]
		const expected = Content({ content: props.content })
		expect(content).toEqual(expected)
	})
})

