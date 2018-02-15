const path = require('path')

const SRC = path.resolve(__dirname, 'src')
const DIST = path.resolve(__dirname, 'dist')

const config = {
	entry: path.resolve(SRC, 'app.js'),
	output: {
		path: DIST,
		filename: 'app.js',
		publicPath: '/'
	},
	devServer: {
		host: '0.0.0.0',
		port: 16006,
		contentBase: SRC,
		compress: true,
		hot: true,
		open: true
	}
}

module.exports = config
