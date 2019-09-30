const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
module.exports = {
    entry: {
        main: './src/main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'creative task',
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackInlineSourcePlugin()
    ],
    devtool: 'inline-source-map',
    devServer:{
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src']
					}
				}
            },
        ],
    },
};