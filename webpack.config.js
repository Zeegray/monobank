const webpack = require('webpack')

const env = process.env.NODE_ENV

let config = {
  mode: env || 'development',
  entry: [
    './src/js/index'
  ],
  output: {
    publicPath: '/dist/',
    filename: "bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      },
    ]
  },
}

module.exports = config