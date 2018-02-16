const { create } = require('../utils/dom')
const Title = require('./Title')
const Meta = require('./Meta')
const Content = require('./Content')

const Feed = (props) => {
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
		Title({ text: props.title }),
		Meta(props),
		Content({ content: props.summary })
	)
	return el
}

module.exports = Feed
