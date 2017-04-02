var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

console.log(path.resolve(__dirname, "src"));

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./js/index.jsx",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass!postcss-loader'
      },
      {
        test: /\.png$/,
        loaders: ['url?limit=100000']
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 11', 'opera 12.1', 'ios 10'] }) ],
  plugins: debug ? [] : [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
