const webpack = require('webpack')
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
	inject: 'head',
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
const extractFontStyle = new ExtractTextPlugin({
	filename: 'font.css'
})
const extractStyle = new ExtractTextPlugin({
	filename: 'app.css'
})
const copyPwaFiles = new CopyWebpackPlugin([
	path.resolve(SRC, 'manifest.json'),
	path.resolve(SRC, 'service-worker.js'),
	path.resolve(SRC, 'font.css')
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
	entry: {
		commons: [
			path.resolve(SRC, 'utils/dom.js'),
			path.resolve(SRC, 'utils/page.js')
		],
		app: path.resolve(SRC, 'app.js'),
	},
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
				test: /\.fontstyle$/,
				use: extractFontStyle.extract({
					use: [
						'css-loader'
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
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: '[name].js'
		}),
		generatePage,
		injectScript,		
		extractCriticalStyle,
		new StyleExtHtmlWebpackPlugin('critical.css'),		
		extractFontStyle,
		extractStyle,
		new OptimizeCssAssetsWebpackPlugin(),
		new HtmlWebpackExcludeAssetsPlugin(),
		copyPwaFiles,
		copyImages,
	]
}

module.exports = config
