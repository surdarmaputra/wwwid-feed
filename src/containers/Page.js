const { create, draw } = require('../utils/dom')

const Page = (props) => {
	const page = create('main', {
		className: 'page'
	})
	if (props.route !== null) draw(props.route.component(props), page)
	else  {
		const notFound = create('div', {
			textContent: 'Page not found'
		})
		draw(notFound, page)
	}
	return page
}

module.exports = Page
