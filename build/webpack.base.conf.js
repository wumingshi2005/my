/**
 * Author: wumingshi
 * Time: 2018-5-23
 */

const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	target: 'web',
	entry: {
		app: path.join(__dirname, '../client/main.js')
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle.[hash:8].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
			  test: /\.vue$/,
			  loader: 'vue-loader'
			  
			},
			{
			  test: /\.jsx$/,
			  loader: 'babel-loader'
			},
			{
			  test: /\.js$/,
			  loader: 'babel-loader',
			  exclude: /node_modules/
			},
			/*{
				test: /\.css$/,
				use: [
						'style-loader', 
						'css-loader'
					]
			},*/
			{
		       test: /\.(gif|jpg|jpeg|png|svg)$/,
		       use: [
		         {
		           loader: 'url-loader',
		           options: {
		             limit: 1024,
		             name: 'resources/[path][name].[hash:8].[ext]'
		           }
		         }
		       ]
			},
			{
			  test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			  use: [{
			    loader: 'url-loader',
			    options: {
			      limit: 10000,
			      name: 'fonts/[hash:8].[name].[ext]'
			    }
			  }]
			}
			/*{
				test: /\.vue$/,
				use: ['vue-loader', 'css-loader']
			}*/
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
		    'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
		}
	},
	
}