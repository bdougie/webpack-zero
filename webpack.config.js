const path = require('path');

module: {
  rules: [
    {
      test: /\.js$/,
      include: path.resolve('./src'),
      loader: 'babel-loader',
    }
  ],
},

