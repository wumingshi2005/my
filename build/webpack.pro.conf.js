const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf.js')
const htmlWebpackPlugin = require('html-webpack-plugin')
// const copyWebpackPlugin = require('webpack-copy-plugin')
/*const ExtractPlugin = require('extract-text-webpack-plugin')*/
const ExtractTextPlugin = require("extract-text-webpack-plugin")
/*const ExtractTextPlugin = require('extract-text-webpack-plugin')*/
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'

const devWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	devtool: false,
	output: {
	  filename: '[name].[chunkhash:8].js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: isDev ? '"development"' : '"production"'
		  }
		}),
		new htmlWebpackPlugin({
			template: path.join(__dirname, '../index.html'),
			title: 'blog'
		}),
		// new copyWebpackPlugin({
		// 	from: path.resolve(__dirname, './static'),
		// 	to: path.resolve(__dirname, './dist/static'),
		// 	ignore: ['.*']
		// }),
		// new ExtractPlugin('styles.[contentHash:8].css')
		new ExtractTextPlugin("styles.[contentHash:8].css")
		
	],
	module: {
	  rules: [
	    {
	      test: /\.styl/,
	      use: ExtractTextPlugin.extract({
	        fallback: 'vue-style-loader',
	        use: [
	          'css-loader',
	          {
	            loader: 'postcss-loader',
	            options: {
	              sourceMap: true,
	            }
	          },
	          'stylus-loader'
	        ]
	      })
	    },
	    {
	      test: /\.css$/,
	      use: ExtractTextPlugin.extract({
	        fallback: "style-loader",
	        use: "css-loader"
	      })
	    }
	  ]
	},
	optimization: {
	  splitChunks: {
	      chunks: "all",
	     
	      cacheGroups: {
	          vendors: {
	              test: /[\\/]node_modules[\\/]/,
	              
	          }
	     
	      }
	  },
	  runtimeChunk: true
	}
})

module.exports = devWebpackConfig