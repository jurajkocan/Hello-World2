// @ts-check

const path = require('path');
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr';
const config = {
    context: __dirname,
    entry: {
        registration: ['./lib/frontend/pages/RegisterClient.tsx', hotMiddlewareScript],
        login: ['./lib/frontend/pages/LoginClient.tsx', hotMiddlewareScript],
        app: ['./lib/frontend/pages/AppServer.tsx', hotMiddlewareScript]
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        contentBase: __dirname + '/public'
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader?configFile=tsconfig.json',
                options: {
                    configFile: 'tsconfig.json'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./public/*.*']),
        new Webpack.DefinePlugin({
            PLATFORM: 'CLIENT'
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;
