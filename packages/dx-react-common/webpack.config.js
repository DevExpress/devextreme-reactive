/* eslint-disable */

var path = require('path');
var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = ({ production }) => ({
  mode: production ? 'production' : 'development',
  context: path.join(__dirname, 'src'),
  entry: {
    index: ['whatwg-fetch', path.join(__dirname, 'src', 'index')]
  },
  output: {
    publicPath: '/dist',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /(node_modules\/)/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules"), "node_modules"],
    extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".ts", ".tsx"]
  },
  plugins: [
    new WriteFilePlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    historyApiFallback: true,
    disableHostCheck: true,
  }
})
