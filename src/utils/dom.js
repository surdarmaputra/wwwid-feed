const create = (element, props) => {
	const el = document.createElement(element)
	if (typeof props !== 'undefined') {
		Object.keys(props).map((key) => {
			el[key] = props[key]
		})
	}
	return el
}

module.exports = {
	create
}
