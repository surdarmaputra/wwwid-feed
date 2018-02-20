const { create } = require('../utils/dom')
const { Link } = require('../utils/router')

const NavBar = ({ title }) => {
	const navbar = create('div', {
		className: 'navbar'
	})
	const navbarInner = create('div', {
		className: 'navbar__inner'
	})
	navbarInner.append(
		Link({
			className: 'navbar__button navbar__button--left',
			textContent: 'Home',
			href: '/'
		}),
		create('div', {
			className: 'navbar__title',
			textContent: title
		}),
		Link({
			className: 'navbar__button navbar__button--right',
			textContent: 'Filter',
			href: '/filter'
		})
	)
	navbar.append(navbarInner)
	return navbar
}

module.exports = NavBar
