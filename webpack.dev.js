const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	mode: 'development',
	devtool: 'eval',
	entry: [path.join(__dirname, '/src/index.tsx')],
	output: {
		filename: 'bundle.js',
		path: `${process.env.PWD}/build`,
	},
	node: {
		fs: 'empty',
	},
	devServer: {
		hot: true,
		host: '0.0.0.0',
		port: '8080',
		contentBase: './src',
		disableHostCheck: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		https: true,
		useLocalIp: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			},
			{
				test: /\.(js|jsx)$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					'css-loader'
				]
			},
			{
				test: /\.ts(x)?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			}
		],
	},
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.tsx',
			'.ts',
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `${process.env.PWD}/public/index.html`,
		}),
		new webpack.HotModuleReplacementPlugin(),
	]
}