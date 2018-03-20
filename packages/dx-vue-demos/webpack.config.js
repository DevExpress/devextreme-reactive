/* eslint-disable */

var path = require('path');
var webpack = require('webpack');

module.exports = ({ production }) => ({
  context: path.join(__dirname, 'src'),
  entry: {
    index: ['babel-polyfill', path.join(__dirname, 'src', 'index')]
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(production ? "production" : "development")
      }
    }),
    ...(!production ? [] :
      [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true
        })
      ]
    ),
  ],
  devtool: production ? 'source-map' : 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3003,
    historyApiFallback: true,
    disableHostCheck: true,
  }
})
