'use strict'
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const ROOT_PATH = path.resolve(__dirname, '../')

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

  devtool: isProd ? 'cheap-source-map' : 'source-map',
  entry: generateEntries => {
    return {
      admin: ['@/admin/index.js', 'babel-polyfill']
    }
  },
  output: {
    publicPath: '/',
    filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
    chunkFilename: isProd ? 'js/[name].chunk.[chunkhash].js' : 'js/[name].chunk.js',
    path: `${ROOT_PATH}/dist`
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
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
          'css-loader?sourceMap',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(le)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
          'css-loader?sourceMap',
          'less-loader?sourceMap&javascriptEnabled=true'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac|png|jpe?g|gif|svg)(\?.*)?$/i,
        use: {
          loader: 'file-loader',
          options: {
            limit: 8192,
            name(file) {
              return isProd ? '[path][name].[hash].[ext]' : '[path][name].[ext]';
            }
          }
        }
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? 'css/[name].[contenthash].css' : 'css/[name].css'
    }),
    // https://github.com/jantimon/html-webpack-plugin/tree/master/examples
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: 'src/admin/index.html',
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
