const { create } = require('../utils/dom')

const Title = ({ text }) => {
	const title = create('div', {
		className: 'title'
	})
	title.append(create('a', {
		textContent: text
	}))
	return title
}

module.exports = Title
