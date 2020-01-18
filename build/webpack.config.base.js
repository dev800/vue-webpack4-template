'use strict'
const path = require('path')

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ROOT_PATH = path.resolve(__dirname, '../')
const utils = require('./utils')
const CONFIG_ENV = process.env.CONFIG_ENV

const {
  VueLoaderPlugin
} = require('vue-loader')

module.exports = {
  // devtool: 'eval',
  devtool: 'source-map',

  output: {
    path: `${ROOT_PATH}/dist/${CONFIG_ENV}`
  },

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
    alias: {
      // 源码目录
      '~': utils.resolve('src'),
      // 项目根目录
      '~~': ROOT_PATH,
      '@': utils.resolve('src'),
      '@@': ROOT_PATH
    }
  },

  entry: {
    'app/demo': ['babel-polyfill', '@/demo/index.ts'],
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(svg)(\?.*)?$/,
        include: [utils.resolve('lib/ui/icons/svg')],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]'
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeViewBox: false },
                { removeXMLNS: true }
              ]
            }
          },
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            jsx: 'babel-loader',
            ts: 'ts-loader',
            tsx: [
              {
                loader: 'babel-loader'
              },
              {
                loader: 'ts-loader',
                options: {
                  appendTsxSuffixTo: [/\.vue$/],
                  transpileOnly: true
                }
              }
            ]
          }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/ts\.vue$/],
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/\.vue$/],
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new SpriteLoaderPlugin(),
    // https://github.com/jantimon/html-webpack-plugin/tree/master/examples
    new HtmlWebpackPlugin({
      filename: 'demo.html',
      template: 'src/demo/index.html',
      chunksSortMode: "manual",
      chunks: ['vendors', 'app/demo'],
      inject: true
    }),
    new ManifestPlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: utils.resolve('static'),
      to: utils.resolve(`dist/${CONFIG_ENV}`),
      toType: 'dir'
    }])
  ]
}
