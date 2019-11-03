'use strict'
const path = require('path')

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ROOT_PATH = path.resolve(__dirname, '../')
const utils = require('./utils')

const {
  VueLoaderPlugin
} = require('vue-loader')


module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '~': utils.resolve('src'),
      '~~': ROOT_PATH,
      '@': utils.resolve('src'),
      '@@': ROOT_PATH
    }
  },

  // devtool: 'eval',
  devtool: 'source-map',
  entry: {
    'app/demo': ['babel-polyfill', '@/demo/index.ts'],
  },
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    path: `${ROOT_PATH}/dist`
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
            ts: [
              {
                loader: 'ts-loader',
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                  transpileOnly: true
                }
              }
            ],
            js: [
              {
                loader: 'babel-loader',
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                  transpileOnly: true
                }
              }
            ],
            tsx: [
              {
                loader: 'ts-loader',
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                  transpileOnly: true
                }
              }
            ],
            jsx: [
              {
                loader: 'babel-loader',
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                  transpileOnly: true
                }
              }
            ]
          },
          options: {
            esModule: true,
            extractCSS: true,
            preserveWhitespace: false
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
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
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
      to: utils.resolve('dist/static'),
      toType: 'dir'
    }])
  ]
}
