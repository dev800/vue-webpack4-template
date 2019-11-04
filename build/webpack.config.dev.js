'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')

const HOST = 'localhost'
const PORT = 9001

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
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'less-loader?javascriptEnabled=true'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac|png|jpe?g|gif|svg)(\?.*)?$/i,
        exclude: [utils.resolve('lib/ui/icons/svg')],
        use: {
          loader: 'file-loader',
          options: {
            limit: 8192,
            name (file) {
              return '[path][name].[ext]';
            }
          }
        }
      }
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
