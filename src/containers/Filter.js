const { create } = require('../utils/dom')
const { setPageTitle, setPageDefaultDescription } = require('../utils/page')
const { Link } = require('../utils/router')
const List = require('../components/List')

const Filter = (props) => {
	const filter = create('div')
	const textBox = create('input', {
		type: 'text',
		className: 'search-box',
		placeholder: 'Search category',
		onkeyup: (event) => {
			const shownCategories = props.categories.map(category => {
				const item = filter.querySelector('#cat-'+category).closest('li')
				let className
				if (category.includes(event.target.value.toLowerCase())) {
					className = 'list__item'				
				} else {
					className = 'list__item list__item--hidden'
				}					
				if (item.className !== className) item.className = className
			})
			
		}
	})
	const categories = props.categories.map((category) => Link({
		textContent: category,
		href: '/cat/'+category,
		id: 'cat-'+category
	}))
	filter.append(
		textBox,
		List({ items: categories })
	)
	setPageTitle(props.appName, 'Filter by category')
	setPageDefaultDescription('WWWID feed filter by category.')
	return filter
}

module.exports = Filter
