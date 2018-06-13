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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
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
      use: [
        {
          loader: 'babel-loader',
          options: {
            "presets": [
              "env",
              "react",
              "stage-2"
            ],
            "plugins": [
              "transform-decorators-legacy",
              "transform-decorators",
              [
                "transform-runtime",
                {
                  "polyfill": false,
                  "regenerator": true
                }
              ]
            ]
          },
        }
      ],
    },
    {
      test: /(\.jpg|\.png)$/,
      loader: 'url-loader?limit=10000',
    },
    {
      test: /\.json/,
      loader: 'json-loader',
    },
    {
      test: /(jquery|bootstrap|tooltipster)(.*)(\.jsx?)$/,
      loader: 'expose-loader?$!expose-loader?jQuery',
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
          uglifyOptions: {
            output: {
              comments: false
            }
          },
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
