const { create } = require('../utils/dom')

const Feed = (document, props) => {
	const feed = create('div', {
		className: 'feed'
	})
	feed.append(
		thumbnail(props.thumbnail),
		info(props)
	)
	return feed
}

const thumbnail = (src) => {
	const el = create('div', {
		className: 'feed__thumbnail'
	})
	el.append(create('img', { src }))
	return el
}

const info = (props) => {
	const el = create('div', {
		className: 'feed__info'
	})
	el.append(
		title(props.title),
		meta(props),
		create('div', {
			className: 'feed__summary',
			innerHTML: props.summary
		})
	)
	return el
}

const title = (text) => {
	const el = create('div', {
		className: 'feed__title'
	})
	el.append(create('a', {
		textContent: text
	}))
	return el
}

const meta = ({ author, pubDate }) => {
	const el = create('div', {
		className: 'feed__meta'
	})
	el.append(
		create('span', {
			className: 'feed__author',
			textContent: 'by ' + author
		}),
		create('span', {
			className: 'feed__date',
			textContent: 'at ' + formatDate(pubDate)
		})
	)
	return el
}

const formatDate = (date) => {
	return date.getFullYear() + '-' + ('0' + date.getMonth()).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
}

module.exports = Feed
