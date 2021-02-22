const path = require('path');
const webpack = require('webpack');

const helper = require('./helper');

const envObj = helper.getProcessEnv();

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),

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
      '@': path.resolve(__dirname, '../src'),
      '~': path.resolve(__dirname, '../node_modules'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.DefinePlugin({'process.env': JSON.stringify(envObj)}),
    new webpack.EnvironmentPlugin(envObj),
  ]
};

