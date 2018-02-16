const { create } = require('../utils/dom')

const TextHeader = ({ text }) => {
	const textHeader = create('div', {
		className: 'text-header',
		textContent: text
	})
	return textHeader
}

module.exports = TextHeader
