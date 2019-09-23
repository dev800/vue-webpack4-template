'use strict'
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const ROOT_PATH = path.resolve(__dirname, './')

const {
  VueLoaderPlugin
} = require('vue-loader')

const utils = require('./utils')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '~': ROOT_PATH,
      '@': utils.resolve('src'),
      'static': utils.resolve('static'),
    }
  },

  devtool: 'source-map',
  entry: generateEntries => {
    return {
      admin: ['@/admin/index.js', 'babel-polyfill']
    }
  },

  module: {
    rules: [{
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
        // },
        // {
        //   loader: 'iview-loader',
        //   options: {
        //     prefix: false
        //   }
      }]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      }
    },
    {
      test: /\.(c|sc|sa|le)ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      },
        'css-loader?sourceMap',
        'sass-loader?sourceMap',
        'less-loader?sourceMap&javascriptEnabled=true'
      ]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:32].[ext]')
        }
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:32].[ext]')
        }
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:32].[ext]')
        }
      }
    }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? 'css/[name].[contenthash].css' : 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: utils.resolve('static/img'),
      to: utils.resolve('dist/static/img'),
      toType: 'dir'
    }])
  ]
}
