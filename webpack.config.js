var getPlugins = function(isProduction) {
  var plugins = [
      new webpack.HotModuleReplacementPlugin()
    ];

  if (isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  }

  return plugins;
}

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/dist');
var APP_DIR = path.resolve(__dirname, 'public');
var isProduction = process.env.NODE_ENV === "production";

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  plugins: getPlugins(isProduction),
  devServer: {
    contentBase: BUILD_DIR,
    hot: true
  }
};

module.exports = config;