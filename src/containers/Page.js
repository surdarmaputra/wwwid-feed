const { create, draw } = require('../utils/dom')
const ErrorPage = require('../components/ErrorPage')

const Page = (props) => {
	const page = create('main', {
		className: 'page'
	})
	if (props.route !== null) draw(props.route.component(props), page)
	else  {
		const notFound = ErrorPage({
			title: 'Oops!',
			description: "There's nothing here...",
			actionText: 'Back to Home',
			actionLink: '/'
		})
		draw(notFound, page)
	}
	return page
}

module.exports = Page
