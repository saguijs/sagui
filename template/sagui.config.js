/**
 * Sagui configuration object
 */
module.exports = {
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
  disabledPlugins: [],

  /**
   * Webpack configuration object
   * see: http://webpack.github.io/docs/configuration.html
   *
   * Will ovewrite and extend the default Sagui configuration
   */
  webpackConfig: {

  },

  /**
   * Karma configuration object
   * see: https://karma-runner.github.io/0.13/config/configuration-file.html
   *
   * Will overwrite and extend the default Sagui configuration
   */
  karmaConfig: {

  }
}
