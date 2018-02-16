const { create, draw } = require('./utils/dom')
const style = require('./app.scss')
const NavBar = require('./components/NavBar')
const Feed = require('./components/Feed')

const store = {
	appName: 'WWWID Reader',
	feeds: [
		{
			title: 'My Feed',
			author: 'Me',
			thumbnail: 'https://cdn-images-1.medium.com/max/939/1*DAksMcGmL2voVF39xrACQA.png',
			summary: 'This is my first feed.',
			pubDate: new Date()
		}
	]
}

const example = store.feeds[0]
for (let i = 0; i < 8; i++) {
	store.feeds.push(example)
}

const Home = () => {
	const home = create('div')
	const feeds = store.feeds.map((feed) => {
		home.append(Feed(feed))
	})
	return home
}

const App = () => {
	const app = create('div')
	app.append(
		NavBar({ title: store.appName }),
		Home()
	)
	return app
}

draw(App(), document.getElementById('app'))
