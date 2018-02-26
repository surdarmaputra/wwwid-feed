const { create } = require('../utils/dom')
const { Link } = require('../utils/router')
const Title = require('./Title')
const Meta = require('./Meta')
const Content = require('./Content')

const Feed = (props) => {
	const feed = Link({
		className: 'feed',
		href: props.href
	})
	feed.append(
		thumbnail(props),
		info(props)
	)
	return feed
}

const thumbnail = ({ thumbnail, title }) => {
	const el = create('div', {
		className: 'feed__thumbnail'
	})
	const img = create('img', {
		className: 'lazy-image',
		src: 'images/wwwid-hollow-192.png',
		alt: "Image for " + title
	})
	img.dataset.src = thumbnail
	el.append(img)
	return el
}

const info = (props) => {
	const el = create('div', {
		className: 'feed__info'
	})
	el.append(
		Title({ text: props.title }),
		Meta(props),
		Content({ content: props.summary })
	)
	return el
}

module.exports = Feed
