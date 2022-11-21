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
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
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
    modules: [path.join(__dirname, "node_modules"), "node_modules"],
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  plugins: [
    new WriteFilePlugin(),
  ],
  devtool: production ? 'source-map' : 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3003,
    historyApiFallback: true,
    disableHostCheck: true,
  }
})
