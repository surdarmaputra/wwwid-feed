const { create } = require('../utils/dom')

const NavBar = ({ title }) => {
	const navbar = create('div', {
		className: 'navbar'
	})
	navbar.append(
		create('div', {
			className: 'navbar__button navbar__button--left',
			textContent: 'Home'
		}),
		create('div', {
			className: 'navbar__title',
			textContent: title
		}),
		create('div', {
			className: 'navbar__button navbar__button--right',
			textContent: 'Filter'
		})
	)
	return navbar
}

module.exports = NavBar
