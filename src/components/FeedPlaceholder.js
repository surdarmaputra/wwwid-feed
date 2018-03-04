const { create } = require('../utils/dom')

const FeedPlaceholder = () => {
	const feed = create('div', {
		className: 'feed'
	})
	feed.append(
		create('div', { className: 'feed__thumbnail feed__thumbnail--empty' }),
		feedInfo()
	)	
	return feed
}

const feedInfo = () => {
	const feedInfo = create('div', {
		className: 'feed__info'
	})
	feedInfo.append(
		create('div', { className: 'title title--empty' }),
		create('div', { className: 'meta meta--empty' }),
		content()
	)
	return feedInfo
}

const content = () => {
	const content = create('div', { className: 'content content--empty' })
	for (let i = 0; i < 7; i++) {
		content.append(create('div', { className: 'paragraph-line' }))
	}
	content.append(create('div', { className: 'paragraph-line paragraph-line--half' }))
	return content
}

module.exports = FeedPlaceholder
