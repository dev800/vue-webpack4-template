'use strict'

const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ROOT_PATH = path.resolve(__dirname, '../')

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  devtool: 'cheap-source-map',
  output: {
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].chunk.[chunkhash].js',
    path: `${ROOT_PATH}/dist`
  },
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader?sourceMap',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader?sourceMap',
          'less-loader?sourceMap&javascriptEnabled=true'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    })
  ]
})
