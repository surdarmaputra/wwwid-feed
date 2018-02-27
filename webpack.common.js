const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')

const SRC = path.resolve(__dirname, 'src')
const DIST = path.resolve(__dirname, 'dist')

const generatePage = new HTMLWebpackPlugin({
	title: 'WWWID READER',
	template: path.resolve(SRC, 'index.html'),
	minify: {
		collapseInlineTagWhitespace: true,
		collapseWhitespace: true,
		html5: true,
		minifyCSS: true,
		minifyJS: true,
		removeComments: true,
		removeEmptyAttributes: true
	},
	excludeAssets: [/\.css/]
})
const extractCriticalStyle = new ExtractTextPlugin({
	filename: 'critical.css'
})
const extractStyle = new ExtractTextPlugin({
	filename: 'app.css'
})
const copyPwaFiles = new CopyWebpackPlugin([
	path.resolve(SRC, 'manifest.json'),
	path.resolve(SRC, 'service-worker.js')
])
const copyImages = new CopyWebpackPlugin([
	{ 
		from: path.resolve(SRC, 'images'),
		to: path.resolve(DIST, 'images')
	}
])
const injectScript = new ScriptExtHtmlWebpackPlugin({
	defaultAttribute: 'defer'
})

const config = {
	entry: path.resolve(SRC, 'app.js'),
	output: {
		path: DIST,
		filename: 'app.js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.crit$/,
				use: extractCriticalStyle.extract({
					use: [
						'css-loader',
						'sass-loader'
					],
					fallback: 'style-loader'
				})
			},
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
		new CleanWebpackPlugin([DIST]),		
		generatePage,
		injectScript,		
		extractCriticalStyle,
		new StyleExtHtmlWebpackPlugin('critical.css'),
		extractStyle,
		new OptimizeCssAssetsWebpackPlugin(),
		new HtmlWebpackExcludeAssetsPlugin(),
		copyPwaFiles,
		copyImages
	]
}

module.exports = config
