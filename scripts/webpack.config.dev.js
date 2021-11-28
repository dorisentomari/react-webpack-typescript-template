const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');

const baseConfig = require('./webpack.config');
const pkg = require('../package.json');
const helper = require('./helper');
const paths = require('./paths');

const defaultConfig = {
  port: process.env.REACT_APP_PORT || 18000
};

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: defaultConfig.port,
    historyApiFallback: {
      disableDotRule: true,
    },
    // onAfterSetupMiddleware(devServer) {},
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      title: pkg.name,
    }),
  ]
});
