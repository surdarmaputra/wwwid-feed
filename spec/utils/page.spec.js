const customMatchers = require('jasmine-dom-custom-matchers')
const { 
	setPageTitle, 
	setPageDescription,
	setPageDefaultDescription
} = require('../../src/utils/page')

describe('page utils', () => {
	beforeAll(() => {
		jasmine.addMatchers(customMatchers)
	})

	describe('setPageTitle()', () => {
		it('should change page title', () => {
			const oldTitle = document.head.querySelector('title').textContent
			const appName = 'WWWID Reader'
			const newTitle = 'New Title'
			setPageTitle(appName, newTitle)
			expect(document.head.querySelector('title').textContent).toBe(newTitle + ' - ' + appName)
		})
	})

	describe('setPageDescription()', () => {
		beforeEach(() => {
			const metaDescriptions = document.head.querySelectorAll('meta[name="description"]')
			metaDescriptions.forEach((meta) => {
				meta.remove()
			})
		})

		it('should set page meta description', () => {
			const expectedMeta = {
				author: 'Me',
				pubDate: new Date(),
				categories: ['first', 'second'],
				summary: 'This is summary'
			}
			const expectedDescription = 'Author: ' + expectedMeta.author +
				', Publication Date: ' + expectedMeta.pubDate + 
				', Categories: ' + expectedMeta.categories.join(', ') +
				', Summary: ' + expectedMeta.summary
			setPageDescription(expectedMeta)
			const metaDescription = document.head.querySelector('meta[name="description"]')
			expect(metaDescription.content).toBe(expectedDescription)
		})
		
		it('should update page meta description if already available', () => {
			const expectedMeta = {
				author: 'Me',
				pubDate: new Date(),
				categories: ['first', 'second'],
				summary: 'This is summary'
			}
			const expectedDescription = 'Author: ' + expectedMeta.author +
				', Publication Date: ' + expectedMeta.pubDate + 
				', Categories: ' + expectedMeta.categories.join(', ') +
				', Summary: ' + expectedMeta.summary
			const meta = document.createElement('meta')
			meta.name = 'description'
			meta.content = 'Page description'
			document.head.append(meta)
			expect(document.head.querySelectorAll('meta[name="description"]').length).toBe(1)
			setPageDescription(expectedMeta)
			const metaDescription = document.head.querySelector('meta[name="description"]')
			expect(metaDescription.content).toBe(expectedDescription)			
			expect(document.head.querySelectorAll('meta[name="description"]').length).toBe(1)
		})
	
		it('should set page meta description author only', () => {
			const expectedMeta = {
				author: 'Me'
			}
			const expectedDescription = 'Author: ' + expectedMeta.author
			setPageDescription(expectedMeta)
			const metaDescription = document.head.querySelector('meta[name="description"]')
			expect(metaDescription.content).toBe(expectedDescription)
		})
		
		it('should set page meta description publication date only', () => {
			const expectedMeta = {
				pubDate: new Date()
			}
			const expectedDescription = 'Publication Date: ' + expectedMeta.pubDate
			setPageDescription(expectedMeta)
			const metaDescription = document.head.querySelector('meta[name="description"]')
			expect(metaDescription.content).toBe(expectedDescription)
		})

		it('should set page meta description categories only', () => {
			const expectedMeta = {
				categories: ['first', 'second'],
			}
			const expectedDescription = 'Categories: ' + expectedMeta.categories.join(', ')
			setPageDescription(expectedMeta)
			const metaDescription = document.head.querySelector('meta[name="description"]')
			expect(metaDescription.content).toBe(expectedDescription)
		})

		it('should set page meta description summary only', () => {
			const expectedMeta = {
				summary: 'This is summary',
			}
			const expectedDescription = 'Summary: ' + expectedMeta.summary
			setPageDescription(expectedMeta)
			const metaDescription = document.head.querySelector('meta[name="description"]')
			expect(metaDescription.content).toBe(expectedDescription)
		})
	})
	
	describe('setPageDefaultDescription()', () => {
		beforeEach(() => {
			const metaDescriptions = document.head.querySelectorAll('meta[name="description"]')
			metaDescriptions.forEach((meta) => {
				meta.remove()
			})
		})

		it('should set page meta description', () => {
			const description = 'Site description'
			setPageDefaultDescription(description)
			const metaDescription = document.head.querySelector('meta[name="description"]')
			expect(metaDescription.content).toBe(description)
		})
		
		it('should update page meta description if already available', () => {
			const description = 'Site description'
			const meta = document.createElement('meta')
			meta.name = 'description'
			meta.content = 'Page description'
			document.head.append(meta)
			expect(document.head.querySelectorAll('meta[name="description"]').length).toBe(1)
			setPageDefaultDescription(description)
			const metaDescription = document.head.querySelector('meta[name="description"]')
			expect(metaDescription.content).toBe(description)		
			expect(document.head.querySelectorAll('meta[name="description"]').length).toBe(1)
		})
	
		it('should set page default description if no description specified', () => {
			const defaultDescription = 'WWWID Reader, a simple yet powerfull RSS Feed reader for WWWID.' 
			setPageDefaultDescription()
			const metaDescription = document.head.querySelector('meta[name="description"]')
			expect(metaDescription.content).toBe(defaultDescription)
		})		
	})
})
