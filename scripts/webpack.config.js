const path = require('path');
const webpack = require('webpack');
// 大小写敏感
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// 模块没找到
const ModuleNotFoundPlugin = require('./plugins/ModuleNotFoundPlugin');
// 监控模块缺失
const WatchMissingNodeModulesPlugin = require('./plugins/WatchMissingNodeModulesPlugin');
const helper = require('./helper');
const paths = require('./paths');

const envObj = helper.getProcessEnv();

module.exports = {
  entry: paths.appIndexJs,

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: path.resolve('src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|gif|svg|png|ttf|woff|woff2)/,
        type: 'asset',
      }
    ]
  },

  resolve: {
    alias: {
      '@': paths.appSrc,
      '~': paths.appNodeModules,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.DefinePlugin({'process.env': JSON.stringify(envObj)}),
    new webpack.EnvironmentPlugin(envObj),
    new CaseSensitivePathsPlugin(),
    new ModuleNotFoundPlugin(paths.appPath),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ],

  stats: 'minimal',

};

