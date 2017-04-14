import path from 'path'
import webpack from 'webpack'
import postCSSModulesValues from 'postcss-modules-values'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import fileExtensions from '../../file-extensions'
import actions from '../../actions'

const defaultConfig = {
  cssModules: true,
  sourceMaps: false,
  extract: true
}

/**
 * Style preset with
 * - CSS Modules support
 * - Sass language
 * - Autoprefixer
 */
export default {
  name: 'style',
  configure ({ action, optimize, pages = [], projectPath, style = {}, browsers }) {
    // Use null-loader during tests
    // for better performance
    if (action === actions.TEST_UNIT) {
      return {
        module: {
          rules: [
            {
              test: fileExtensions.test.CSS,
              loader: 'null-loader'
            },
            {
              test: fileExtensions.test.SCSS,
              loader: 'null-loader'
            }
          ]
        }
      }
    }

    const config = {
      ...defaultConfig,
      ...style
    }

    const shouldExtract = config.extract && pages.length > 0 && action === actions.BUILD
    const localIdentName = optimize ? '[hash:base64:5]' : '[path][local]-[hash:base64:5]'

    const extractSass = new ExtractTextPlugin('[name]-[hash]-0.css')
    const extractCss = new ExtractTextPlugin('[name]-[hash]-1.css')

    // toggle source maps and CSS Modules
    const cssModules = config.cssModules ? 'modules' : ''
    const sourceMaps = config.sourceMaps ? 'sourceMap' : ''

    // importLoaders: use the following postcss-loader in @import statements
    // modules: enable css-modules
    const cssLoaders = [
      `css-loader?${cssModules}&${sourceMaps}&importLoaders=1&localIdentName=${localIdentName}`,
      'postcss-loader'
    ]

    // importLoaders: use the following sass-loader in @import statements
    // modules: enable css-modules
    const sassLoaders = [
      `css-loader?${cssModules}&${sourceMaps}&importLoaders=3&localIdentName=${localIdentName}`,
      'postcss-loader',
      'resolve-url-loader', // Fixes loading of relative URLs in nested Sass modules
      `sass-loader?${sourceMaps}&outputStyle=expanded&` +
        'includePaths[]=' + (path.resolve(projectPath, './node_modules'))
    ]

    return {
      module: {
        rules: [
          {
            test: fileExtensions.test.CSS,
            loader: shouldExtract
              ? extractCss.extract(cssLoaders)
              : ['style-loader', ...cssLoaders].join('!')
          },
          {
            test: fileExtensions.test.SCSS,
            loader: shouldExtract
              ? extractSass.extract(sassLoaders)
              : ['style-loader', ...sassLoaders].join('!')
          }
        ]
      },

      plugins: [
        new webpack.LoaderOptionsPlugin({
          debug: true,
          options: {
            postcss: {
              plugins: () => [
                autoprefixer({ browsers }),

                // allow importing values (variables) between css modules
                // see: https://github.com/css-modules/postcss-modules-values#usage
                postCSSModulesValues
              ]
            }
          }
        }),

        ...(shouldExtract ? [extractCss, extractSass] : [])
      ]
    }
  }
}
