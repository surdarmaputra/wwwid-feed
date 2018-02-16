const { create } = require('../utils/dom')

const Content = ({ content }) => {
	const el = create('div', {
		className: 'content',
		innerHTML: content
	})
	return el
}

module.exports = Content
