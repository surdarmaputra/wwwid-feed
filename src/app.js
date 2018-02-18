const { create, draw } = require('./utils/dom')
const { withRouter, Link } = require('./utils/router')
const style = require('./app.scss')
const NavBar = require('./components/NavBar')
const Feed = require('./components/Feed')
const Article = require('./components/Article')

const store = {
	appName: 'WWWID Reader',
	feeds: [
		{
			title: 'My Feed',
			author: 'Me',
			thumbnail: 'https://cdn-images-1.medium.com/max/939/1*DAksMcGmL2voVF39xrACQA.png',
			summary: 'This is my first feed.',
			content: '<p>This is my first feed.</p>',
			pubDate: new Date()
		}
	]
}

const example = store.feeds[0]
for (let i = 0; i < 8; i++) {
	store.feeds.push(example)
}

const Home = (props) => {
	const home = create('div')
	const feeds = props.feeds.map((feed) => {
		home.append(Feed(feed))
	})
	return home
}

const Detail = (props) => {
	const detail = Article(props.feeds[0])
	return detail
}

const routes = [
	{
		location: '/',
		exact: true,
		component: Home
	},
	{
		location: '/article/{id}',
		exact: false,
		component: Detail
	}
]

const Page = (props) => {
	return props.route.component(props)
}

const App = () => {
	const app = create('div')
	const sampleLink = Link({
		textContent: 'Article',
		href: '/article/1',
		className: 'custom-link'
	})
	const Router = withRouter(Page, routes)

	app.append(
		NavBar({ title: store.appName }),
		Router(store),
		sampleLink
	)
	return app
}

draw(App(), document.getElementById('app'))
