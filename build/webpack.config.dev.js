'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const HOST = 'localhost'
const PORT = 8080

module.exports = merge(baseConfig, {
  mode: 'development',

  devServer: {
    clientLogLevel: 'debug',
    hot: true,
    contentBase: 'dist',
    compress: true,
    host: HOST,
    port: PORT,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: false
  },

  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(le)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
          'css-loader',
          'less-loader?javascriptEnabled=true'
        ]
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ]
})
