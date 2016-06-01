var sagui = require('sagui')
var webpack = require('./webpack.config')

module.exports = sagui().karma({
  sagui: {
    enabledPresets: [
      'base',
      'browsers',
      'coverage',
      'frameworks',
      'reporters'
    ]
  },

  // webpack configuration used to build the tests
  webpack: webpack

  /**
   * Additional Karma configuration
   * Will overwrite and extend the default Sagui configuration
   * see: https://karma-runner.github.io/0.13/config/configuration-file.html
   */
})
