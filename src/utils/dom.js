const create = (element, props) => {
	const el = document.createElement(element)
	if (typeof props !== 'undefined') {
		Object.keys(props).map((key) => {
			el[key] = props[key]
		})
	}
	return el
}

const draw = (element, targetElement) => {
	if (targetElement.children.length > 0) {
		while(targetElement.firstChild) {
			targetElement.removeChild(targetElement.firstChild)
		}
	}
	targetElement.appendChild(element)
}

module.exports = {
	create,
	draw
}
