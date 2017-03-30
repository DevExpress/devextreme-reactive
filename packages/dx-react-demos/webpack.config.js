/* eslint-disable */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        index: path.join(__dirname, 'src', 'index')
    },
    output: {
		publicPath: '/dist',
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|public\/)/,
                use: ["babel-loader"]
            },
            { 
                test: /\.css$/, 
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        alias: {
            // Strange hack for lerna
            '@devexpress/dx-react-datagrid-bootstrap3': path.resolve('./node_modules/@devexpress/dx-react-datagrid-bootstrap3'),
            '@devexpress/dx-react-datagrid': path.resolve('./node_modules/@devexpress/dx-react-datagrid'),
            '@devexpress/dx-datagrid-core': path.resolve('./node_modules/@devexpress/dx-react-datagrid/node_modules/@devexpress/dx-datagrid-core'),
            '@devexpress/dx-react-core': path.resolve('./node_modules/@devexpress/dx-react-datagrid/node_modules/@devexpress/dx-react-core'),
            '@devexpress/dx-core': path.resolve('./node_modules/@devexpress/dx-react-datagrid/node_modules/@devexpress/dx-react-core/node_modules/@devexpress/dx-core'),
            'react-dom': path.resolve('./node_modules/react-dom'),
        },
        extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": { 
                //NODE_ENV: JSON.stringify("production") 
            }
        })
    ],
    devtool: 'eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 3002,
    }
}