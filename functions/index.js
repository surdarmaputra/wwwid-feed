const functions = require('firebase-functions');
const axios = require('axios')

const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'

exports.feeds = functions.https.onRequest((req, res) => {
	axios.get(feedUrl)
		.then((response) => res.send(response.data))
		.catch((error) => {
			if (error.response) {
				res.send(error.response.data)
			} else if (error.request) {
				res.status(500).send({ message: 'Failed to contact data source.' })
			} else {
				res.status(500).send({ message: error.message })
			}
		})
})
