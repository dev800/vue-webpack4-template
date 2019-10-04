'use strict'
const path = require('path')

const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ROOT_PATH = path.resolve(__dirname, '../')

const {
  VueLoaderPlugin
} = require('vue-loader')

const utils = require('./utils')

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '~': ROOT_PATH,
      '@': utils.resolve('src'),
      'static': utils.resolve('static'),
    }
  },

  devtool: 'source-map',
  entry: generateEntries => {
    return {
      demo: ['@/demo/index.js'],
    }
  },
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    path: `${ROOT_PATH}/dist`
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            extractCSS: true,
            preserveWhitespace: false
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    // https://github.com/jantimon/html-webpack-plugin/tree/master/examples
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/demo/index.html',
      inject: true
    }),
    new ManifestPlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: utils.resolve('static'),
      to: utils.resolve('dist/static'),
      toType: 'dir'
    }])
  ]
}
