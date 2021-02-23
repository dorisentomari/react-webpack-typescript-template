const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');

const baseConfig = require('./webpack.config');
const pkg = require('../package.json');
const helper = require('./helper');

const defaultConfig = {
  port: process.env.REACT_APP_PORT || 18000
};

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    port: defaultConfig.port,
    hot: true,
    compress: true,
    clientLogLevel: 'silent',
    contentBase: path.resolve(__dirname, '../public'),
    historyApiFallback: {
      index: path.resolve(__dirname, '../public/index.html'),
      disableDotRule: true,
    },
    after(app, server) {
      console.log(chalk.green(`❤  ${pkg.name} server startup successfully, please visit...`));
      console.log(chalk.green(`❤  http://localhost:${defaultConfig.port}`));
      console.log(chalk.green(`❤  http://${helper.getLocalIP()}:${defaultConfig.port}`));
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader'}
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {importLoaders: 2}
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {plugins: ['autoprefixer']}
            }
          },
          'less-loader',
        ]
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: pkg.name,
    })
  ]

});
