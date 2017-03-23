const path = require('path');

module.exports = {
  entry: path.resolve('./src/index.js'),
  output: {
      path: path.resolve('./dist'),
      filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('./src'),
        loader: 'babel-loader',
        query: require('./babelrc.js'),
      }
    ],
  },
};

