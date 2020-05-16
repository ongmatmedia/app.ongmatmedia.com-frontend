const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: [path.join(__dirname, '/src/index.tsx')],
	output: {
		filename: 'bundle.js',
		path: `${process.env.PWD}/build`,
	},
	node: {
		fs: 'empty',
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
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.ts(x)?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					'plugins': ['lodash'],
					'presets': [['@babel/env', { 'modules': false, 'targets': { 'node': 8 } }]]
				}
			}
		],
	},
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.tsx',
			'.ts',
		],
		"alias": {
			"react": "preact/compat",
			"react-dom/test-utils": "preact/test-utils",
			"react-dom": "preact/compat",
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `${process.env.PWD}/public/index.html`,
		}),
		new MiniCssExtractPlugin(),
		new BundleAnalyzerPlugin(),
		new LodashModuleReplacementPlugin(),
	],
	optimization: {
		runtimeChunk: {
			name: 'manifest'
		},
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	}
}