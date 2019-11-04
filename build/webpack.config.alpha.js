'use strict'

const merge = require('webpack-merge')
const prodConfig = require('./webpack.config.prod')

module.exports = merge(prodConfig, {

})
