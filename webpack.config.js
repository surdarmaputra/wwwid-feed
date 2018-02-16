const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const SRC = path.resolve(__dirname, 'src')
const DIST = path.resolve(__dirname, 'dist')

const generatePage = new HTMLWebpackPlugin({
	title: 'WWWID READER',
	template: path.resolve(SRC, 'index.html')
})
const extractStyle = new ExtractTextPlugin({
	filename: 'app.css'
})

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
		open: true
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: extractStyle.extract({
					use: [
						'css-loader',
						'sass-loader'
					],
					fallback: 'style-loader'
				})
			}
		]
	},
	plugins: [
		generatePage,
		extractStyle
	]
}

module.exports = config
