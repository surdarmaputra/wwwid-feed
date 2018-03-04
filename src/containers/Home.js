const { create } = require('../utils/dom')
const { setPageTitle, setPageDefaultDescription } = require('../utils/page')
const Feed = require('../components/Feed')
const FeedPlaceholder = require('../components/FeedPlaceholder')

const Home = (props) => {
	const home = create('div', {
		className: 'feeds'
	})
	if (props.feeds.length > 0) {
		props.feeds.map((feed) => {
			home.append(Feed(feed))
		})
	} else {
		for (let i = 0; i < 3; i++) {
			home.append(FeedPlaceholder())
		}
	}
	setPageTitle(props.appName, 'Home')
	setPageDefaultDescription()
	return home
}

module.exports = Home
