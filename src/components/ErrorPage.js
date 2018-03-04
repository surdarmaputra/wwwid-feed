const { create } = require('../utils/dom')
const { Link } = require('../utils/router')

const ErrorPage = ({ title, description, actionText, actionLink }) => {
	const error = create('div', {
		className: 'error-page'
	})
	error.append(
		create('div', { 
			className: 'error-page__title',
			textContent: title
		}),
		create('div', {
			className: 'error-page__description',
			textContent: description
		}),
		Link({
			className: 'error-page__action',
			textContent: actionText,
			href: actionLink
		})
	)
	return error
}

module.exports = ErrorPage
