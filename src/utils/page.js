const { create } = require('./dom')

const setPageTitle = (appName, title) => {
	document.head.querySelector('title').textContent = title + ' - ' + appName
}

const setPageDescription = ({ author, pubDate, categories, summary}) => {
	const descriptionMeta = []
	if (typeof author !== 'undefined') descriptionMeta.push('Author: ' + author)
	if (typeof pubDate !== 'undefined') descriptionMeta.push('Publication Date: ' +  pubDate)
	if (typeof categories !== 'undefined') descriptionMeta.push('Categories: ' + categories.join(', '))
	if (typeof summary !== 'undefined') descriptionMeta.push('Summary: ' + summary)

	const targetMeta = document.head.querySelector('meta[name="description"]')
	if (typeof targetMeta !== 'undefined' && targetMeta !== null) targetMeta.setAttribute('content', descriptionMeta.join(', '))
	else {
		document.head.append(create('meta', {
			name: 'description',
			content: descriptionMeta.join(', ')
		}))
	}
}

const setPageDefaultDescription = (message) => {
	if (typeof message === 'undefined') message = "WWWID Reader, a simple yet powerfull RSS Feed reader for WWWID."
	const targetMeta = document.head.querySelector('meta[name="description"]')
	if (typeof targetMeta !== 'undefined' && targetMeta !== null) targetMeta.setAttribute('content', message)
	else {
		document.head.append(create('meta', {
			name: 'description',
			content: message
		}))
	}
}

module.exports = {
	setPageTitle,
	setPageDescription,
	setPageDefaultDescription
}

