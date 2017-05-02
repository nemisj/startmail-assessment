'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:3000',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // the entry point of our app
    path.join(__dirname, './src/index.jsx')
  ],

  output: {
    // the output bundle
    filename: 'bundle.js',

    path: path.resolve(__dirname, 'build'),
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        use: IS_PROD ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ { loader: 'css-loader', options: { modules: true } }, 'sass-loader' ]
        }) : [
          'style-loader',
          { loader: 'css-loader', options: { modules: true } },
          'sass-loader'
        ]
      }
    ],
  },

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './src/index.html')
    })
  ],

  devServer: {
    port: 3000,

    // enable HMR on the server
    hot: true,
  },
};

if (IS_PROD) {
  module.exports.plugins.push(new ExtractTextPlugin('[name].css'));
}
