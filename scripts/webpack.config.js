const path = require('path');
const webpack = require('webpack');
// 大小写敏感
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// 模块没找到
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
// 监控模块缺失
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const helper = require('./helper');
const paths = require('./paths');

const envObj = helper.getProcessEnv();
const pkg = require('../package.json');

module.exports = {
  entry: paths.appIndexJs,
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: paths.appSrc,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: "local",
                auto: true,
                exportGlobals: true,
                localIdentName: "[name]__[local]--[hash:base64:8]",
                localIdentContext: paths.appSrc,
                localIdentHashSalt: pkg.name,
              },
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {plugins: ['autoprefixer']}
            }
          },
          {loader: 'less-loader'}
        ]
      },
      {
        test: /\.avif$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/avif',
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(jpg|jpeg|gif|svg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 8096,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: 'asset',
        loader: 'file-loader',
        exclude: /\.(js|mjs|jsx|ts|tsx|html|json)$/,
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
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
    new WebpackManifestPlugin({
      fileName: `${pkg.name}.manifest.json`,
      publicPath: '',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith('.map')
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
  ],
  stats: 'minimal',
};
