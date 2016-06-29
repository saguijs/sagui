import path from 'path'
import postCSSModulesValues from 'postcss-modules-values'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import fileExtensions from '../../file-extensions'
import actions from '../../actions'

const defaultOptions = {
  cssModules: true
}

/**
 * Style preset with
 * - CSS Modules support
 * - Sass language
 * - Autoprefixer
 */
export default {
  name: 'style',
  configure ({ action, optimize, pages = [], projectPath, style = {} }) {
    const options = {
      ...defaultOptions,
      ...style
    }

    const shouldExtract = pages.length > 0 && action === actions.BUILD
    const localIdentName = optimize ? '[hash]' : '[path][local]-[hash:base64:5]'

    const extractSass = new ExtractTextPlugin('[name]-[hash]-0.css')
    const extractCss = new ExtractTextPlugin('[name]-[hash]-1.css')

    // importLoaders: use the following postcss-loader in @import statements
    // modules: enable css-modules
    const cssLoaders = [
      `css?${options.cssModules ? 'modules' : ''}&sourceMap&importLoaders=1&localIdentName=${localIdentName}`,
      'postcss-loader'
    ]

    // importLoaders: use the following sass-loader in @import statements
    // modules: enable css-modules
    const sassLoaders = [
      `css?${options.cssModules ? 'modules' : ''}&sourceMap&importLoaders=3&localIdentName=${localIdentName}`,
      'postcss-loader',
      'resolve-url', // Fixes loading of relative URLs in nested Sass modules
      'sass?sourceMap&outputStyle=expanded&' +
        'includePaths[]=' + (path.resolve(projectPath, './node_modules'))
    ]

    return {
      postcss: [
        // allow importing values (variables) between css modules
        // see: https://github.com/css-modules/postcss-modules-values#usage
        postCSSModulesValues,

        // Support browser prefixes for any browser with greater than 5% markeshare
        autoprefixer({ browsers: ['> 5%'] })
      ],

      module: {
        loaders: [
          {
            test: fileExtensions.CSS,
            loader: shouldExtract
              ? extractCss.extract(cssLoaders)
              : ['style', ...cssLoaders].join('!')
          },
          {
            test: fileExtensions.SCSS,
            loader: shouldExtract
              ? extractSass.extract(sassLoaders)
              : ['style', ...sassLoaders].join('!')
          }
        ]
      },

      plugins: shouldExtract ? [extractCss, extractSass] : []
    }
  }
}
