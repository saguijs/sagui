var sagui = require('sagui')
var webpackConfig = require('./webpack.config')

/**
 * Karma configuration object
 * see: https://karma-runner.github.io/0.13/config/configuration-file.html
 *
 * Will overwrite and extend the default Sagui configuration
 */
module.exports = sagui.karma(webpackConfig, {

})
