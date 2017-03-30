var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./app.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: [],
        }
      }
    ],
  },
  output: {
    path: __dirname + "/build/",
    filename: "app_bundle.js"
  },
  resolve: { alias: { 'socket.io-client': path.join( __dirname, 'node_modules', 'socket.io-client', 'socket.io.js' ) } },
  plugins: debug ? [] : [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
