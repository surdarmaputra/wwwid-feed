const { create } = require('../utils/dom')

const List = ({ items }) => {
	const list = create('ul', {
		className: 'list'
	})
	items.map((item) => {
		if (typeof item === 'object' && item instanceof Element) {
			const listItem = create('li', {
				className: 'list__item'
			})
			listItem.appendChild(item)
			list.appendChild(listItem)
		} else {
			list.appendChild(create('li', {
				className: 'list__item',
				textContent: item
			}))	
		}
	})
	return list
}

module.exports = List
