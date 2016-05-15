var sagui = require('sagui')

/**
 * Webpack configuration object
 * see: http://webpack.github.io/docs/configuration.html
 *
 * Will ovewrite and extend the default Sagui configuration
 */
module.exports = sagui.webpack({
  sagui: {
    /**
     * Different application entry-points
     * Each page is a combination of a JavaScript file and a HTML file
     *
     * Example: 'index' -> 'index.html' and 'index.js'
     */
    pages: ['index'],

    /**
     * List of Sagui plugins to disable
     */
    disabledPlugins: []
  }
})
