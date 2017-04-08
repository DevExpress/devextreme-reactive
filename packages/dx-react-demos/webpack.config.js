/* eslint-disable */

var path = require('path');
var webpack = require('webpack');

module.exports = ({ production }) => ({
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
        test: /\.js$/,
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
      }
    ]
  },
  resolve: {
    alias: {
      // Strange hack for react-bootstrap
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
    extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
  },
  plugins: [
    ...(!production ? [] :
      [
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true
        })
      ]
    ),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(production ? "production" : "development")
      }
    })
  ],
  devtool: production ? 'source-map' : 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3002,
    historyApiFallback: true,
  }
})
