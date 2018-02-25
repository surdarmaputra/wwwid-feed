const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const config = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		host: '0.0.0.0',
		port: 16006,
		compress: true,
		open: true
	}	
})
	
module.exports = config
