var webpack = require('webpack');
var path = require('path'); //引入node的path库
var HtmlwebpackPlugin = require('html-webpack-plugin');

var config = {
    entry: {
        app: [path.resolve(__dirname, 'src/index.js')]
    }, //入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 指定编译后的代码位置为 dist/bundle.js
        filename: './bundle.js'
    },
    module: {
        rules: [
            // 为webpack指定loaders
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.resolve(__dirname, 'img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.resolve(__dirname, 'fonts/[name].[hash:7].[ext]')
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'sense-monitor',
            template: path.resolve(__dirname, 'index.html'),
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devtool: 'cheap-module-eval-source-map'
};

module.exports = config;