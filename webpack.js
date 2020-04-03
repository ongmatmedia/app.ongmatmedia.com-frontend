const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
    mode: "development",
    devtool: "source-map",
    node: {
        fs: "empty"
    },
    devServer: {
        host: '0.0.0.0',
        port: '8080',
        contentBase: './src',
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        https: true,
        useLocalIp:true,
        historyApiFallback: true,
    },
    entry: [path.join(__dirname, '/src/index.tsx')],
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            }, 
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                },
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        javascriptEnabled: true
                    }
                }]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
        filename: '[name].js',
        path: `${process.env.PWD}/build`,
    },
    plugins: [
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/service-worker.ts'),
            publicPath: '/service-worker.js'
        }),
        new WebpackPwaManifest(
            {
                filename: "manifest.json",
                name: "App",
                orientation: "portrait",
                display: "standalone",
                start_url: "/",
                fingerprints: false,
                inject: true,
                gcm_sender_id: '623436414105'
            }

        ),
        new HtmlWebpackPlugin({
            template: `${process.env.PWD}/public/index.html`
        })
    ]
};