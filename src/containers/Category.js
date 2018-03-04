const { create } = require('../utils/dom')
const { setPageTitle, setPageDefaultDescription } = require('../utils/page')
const TextHeader = require('../components/TextHeader')
const Feed = require('../components/Feed')

const Category = (props) => {
	const wrapper = create('div')
	const feedWrapper = create('div')
	const category = props.route.params.category
	const feeds = props.feeds.filter((feed) => typeof feed.categories !== 'undefined' && feed.categories.includes(category)).map((feed) => feedWrapper.append(Feed(feed)))
	wrapper.append(
		TextHeader({ text: 'FEEDS UNDER "'+category+'"' }),
		feedWrapper
	)
	setPageTitle(props.appName, 'Feeds under ' + category + ' category')
	setPageDefaultDescription('WWWID feeds under ' + category + ' category')
	return wrapper
}

module.exports = Category
