import postCSSModulesValues from 'postcss-modules-values'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  name: 'webpack-css-modules',
  configure ({ pages = [], buildTarget }) {
    const extractCSS = new ExtractTextPlugin('[name]-[hash]-[ext].css')
    const enabled = pages.length > 0 && (buildTarget === 'dist' || buildTarget === 'build')

    // importLoaders: use the following postcss-loader in @import statements
    // modules: enable css-mobules
    const baseLoader = 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]-[hash]!postcss-loader'

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
            loader: enabled ? extractCSS.extract(baseLoader) : `style!${baseLoader}`
          }
        ]
      },

      plugins: enabled ? [extractCSS] : []
    }
  }
}
