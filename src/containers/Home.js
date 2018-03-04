const { create } = require('../utils/dom')
const { setPageTitle, setPageDefaultDescription } = require('../utils/page')
const Feed = require('../components/Feed')

const Home = (props) => {
	const home = create('div', {
		className: 'feeds'
	})
	const feeds = props.feeds.map((feed) => {
		home.append(Feed(feed))
	})
	setPageTitle(props.appName, 'Home')
	setPageDefaultDescription()
	return home
}

module.exports = Home
