import postCSSModulesValues from 'postcss-modules-values'

export default {
  name: 'webpack-css-modules',
  configure () {
    return {
      postcss: [
        // allow importing values (variables) between css modules
        // see: https://github.com/css-modules/postcss-modules-values#usage
        postCSSModulesValues
      ],

      module: {
        loaders: [
          {
            test: /\.css$/,
            loaders: [
              'style-loader',
              // importLoaders: use the following postcss-loader in @import statements
              // modules: enable css-mobules
              'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]-[hash]',
              'postcss-loader'
            ]
          }
        ]
      }
    }
  }
}
