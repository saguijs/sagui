var sagui = require('sagui')
var webpackConfig = require('./webpack.config')

module.exports = sagui().karma({
  /**
   * Additional Karma configuration
   * Will overwrite and extend the default Sagui configuration
   * see: https://karma-runner.github.io/0.13/config/configuration-file.html
   */
}, webpackConfig)
