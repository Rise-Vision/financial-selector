const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
// const SplitByPathPlugin = require('webpack-split-by-path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const sourceMap = process.env.TEST
  ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.ts$/ })]
  : [ ];

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    __TEST__: JSON.stringify(process.env.TEST || false),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(
      __dirname, '..', '..', 'src',
      'index.html'),
    chunks: ['financial_selector'], // inject only financial_selector
    inject: 'body',
  }),
  new webpack.NoErrorsPlugin(),
  new CopyWebpackPlugin([
    {
      from: path.join(
        __dirname, '..', '..', 'src', 'assets'),
      to: 'assets',
    },
    {
      from: path.join(
        __dirname, '..', '..', 'node_modules', 'rv-common-style', 'dist', 'fonts'),
      to: 'fonts',
    }
  ]),
].concat(sourceMap);

const devPlugins = [
  new StyleLintPlugin({
    configFile: path.join(__dirname, '..', '..', '.stylelintrc'),
    files: ['src/**/*.css'],
    failOnError: false,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new StringReplacePlugin(),
  new webpack.DefinePlugin({
    WEBPACK_IS_DEVELOPMENT: true,
    WEBPACK_IS_PRODUCTION:  false,
    WEBPACK_IS_STAGING:     false
  })
];

const prodPlugins = [
  // new SplitByPathPlugin([
  //   { name: 'vendor', path: [path.join(__dirname, '/node_modules/')] },
  // ]),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.DefinePlugin({
    WEBPACK_IS_DEVELOPMENT: false,
    WEBPACK_IS_PRODUCTION:  true,
    WEBPACK_IS_STAGING:     false
  })
];

module.exports = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);
