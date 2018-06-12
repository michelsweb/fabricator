const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


/**
 * Define plugins based on environment
 * @param {boolean} isDev If in development mode
 * @return {Array}
 */
function getPlugins() {

  const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({}),
  ];

  return plugins;

}


/**
 * Define loaders
 * @return {Array}
 */
function getRules() {

  const rules = [
    {
      test: /(\.js)/,
      exclude: /(node_modules)/,
      loaders: ['babel-loader'],
    },
    {
      test: /(\.jpg|\.png)$/,
      loader: 'url-loader?limit=10000',
    },
    {
      test: /\.json/,
      loader: 'json-loader',
    },
  ];

  return rules;

}


module.exports = (config) => {
  return {
    optimization: {
      minimize: !config.dev,
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: false,
        }),
      ],
    },
    entry: {
      'fabricator/scripts/f': config.scripts.fabricator.src,
      'toolkit/scripts/toolkit': config.scripts.toolkit.src,
    },
    output: {
      path: path.resolve(__dirname, config.dest, 'assets'),
      filename: '[name].js',
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
    },
    plugins: getPlugins(),
    module: {
      rules: getRules(),
    },
  };
};
