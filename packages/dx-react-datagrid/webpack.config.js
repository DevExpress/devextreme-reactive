/* eslint-disable */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        index: path.join(__dirname, 'src', 'index')
    },
    output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
        libraryTarget: 'umd'
	},
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|public\/)/,
                use: ["babel-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
    },
    externals: {
        '@devexpress/dx-core': '@devexpress/dx-core',
        '@devexpress/dx-datagrid-core': '@devexpress/dx-datagrid-core',
        'react': 'react'
    }
}
