var sagui = require('sagui')

module.exports = sagui().webpack({
  sagui: {
    /**
     * Different application entry-points
     * Each page is a combination of a JavaScript file and a HTML file
     *
     * Example: 'index' -> 'index.html' and 'index.js'
     */
    pages: ['index'],

    enabledPresets: [
      'babel',
      'base',
      'defineNodeENV',
      'eslint',
      'fonts',
      'images',
      'json',
      'library',
      'pages',
      'style',
      'videos'
    ]
  }

  /**
   * Additional webpack configuration
   * Will ovewrite and extend the default Sagui configuration
   * see: http://webpack.github.io/docs/configuration.html
   */
})
