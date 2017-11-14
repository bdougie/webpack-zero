const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: path.resolve('./src/foo.js'),
  output: {
      path: path.resolve('./dist'),
      filename: 'bundle.js',
  },
  // module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     include: path.resolve('./src'),
    //     loader: 'babel-loader',
    //     query: require('./babelrc.js'),
    //   }
    // ],
  // },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     output: {
  //       comments: false
  //     }
  //   })
  // ]
};

