/**
 * Author: wumingshi
 * Time: 2018-5-23
 */

const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf.js')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('webpack-copy-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'

const devWebpackConfig = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: '#cheap-module-source-map',
	devServer: {
	  contentBase: './dist',
	  port: 8080,
	  host: '0.0.0.0',
	  overlay: {
	  	errors: true
	  },
	  hot: true  
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: isDev ? '"development"' : '"production"'
		  }
		}),
		new htmlWebpackPlugin({
			template: 'index.html',
			title: 'blog'
		}),
		new copyWebpackPlugin({
			from: path.resolve(__dirname, '../static'),
			to: path.resolve(__dirname, '../dist/static'),
			ignore: ['.*']
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
	module: {
	  rules: [
	    {
	      test: /\.styl/,
	      use: [
	        'vue-style-loader',
	        'css-loader',
	        {
	          loader: 'postcss-loader',
	          options: {
	            sourceMap: true,
	          }
	        },
	        'stylus-loader'
	      ]
	    }
	  ]
	}
})

module.exports = devWebpackConfig


