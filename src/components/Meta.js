const { create } = require('../utils/dom')

const Meta = ({ author, pubDate }) => {
	const meta = create('div', {
		className: 'meta'
	})
	meta.append(
		create('span', {
			className: 'meta__author',
			textContent: 'by ' + author
		}),
		create('span', {
			className: 'meta__date',
			textContent: 'at ' + formatDate(pubDate)
		})
	)
	return meta
}

const formatDate = (date) => {
	return typeof date === 'object' && date instanceof Date ? date.getFullYear() + '-' + ('0' + date.getMonth()).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) : ''
}

module.exports = Meta
