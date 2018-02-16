const { create } = require('../utils/dom')
const Title = require('./Title')
const Meta = require('./Meta')
const Content = require('./Content')

const Article = (props) => {
	const article = create('div', {
		className: 'article'
	})
	article.append(
		thumbnail(props.thumbnail),
		body(props)
	)
	return article
}

const thumbnail = (src) => {
	const el = create('div', {
		className: 'article__thumbnail'
	})
	el.append(create('img', { src }))
	return el
}

const body = (props) => {
	const el = create('div', {
		className: 'article__body'
	})
	el.append(
		Title({ text: props.title }),
		Meta(props),
		Content({ content: props.content})
	)
	return el
}

module.exports = Article
