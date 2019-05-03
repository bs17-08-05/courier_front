'use strict'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: [
    './src/main.js'
  ],
  output: {
    path: __dirname + '/dist/static/main/js/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('front/src'),
    }
  },
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'vue-style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
