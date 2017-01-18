import webpack from 'webpack'
import path from 'path'
import postCSSModulesValues from 'postcss-modules-values'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import fileExtensions from '../../file-extensions'
import actions from '../../actions'

const defaultOptions = {
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
  configure ({ action, optimize, pages = [], projectPath, style = {} }) {
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

    const options = {
      ...defaultOptions,
      ...style
    }

    // const shouldExtract = options.extract && pages.length > 0 && action === actions.BUILD
    const localIdentName = optimize ? '[hash:base64:5]' : '[path][local]-[hash:base64:5]'

    // const extractSass = new ExtractTextPlugin('[name]-[hash]-0.css')
    // const extractCss = new ExtractTextPlugin('[name]-[hash]-1.css')

    return {
      module: {
        rules: [
          {
            test: fileExtensions.test.CSS,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  cssModules: options.cssModules,
                  sourceMaps: options.sourceMaps,
                  importLoaders: 1, // use the following postcss-loader in @import statements
                  localIdentName: localIdentName
                }
              },
              {
                loader: 'postcss-loader'
              }
            ]
          },
          {
            test: fileExtensions.test.SCSS,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  cssModules: options.cssModules,
                  sourceMaps: options.sourceMaps,
                  importLoaders: 3, // use the following postcss-loader in @import statements
                  localIdentName: localIdentName
                }
              },
              {
                loader: 'postcss-loader'
              },
              {
                // Fixes loading of relative URLs in nested Sass modules
                loader: 'resolve-url-loader'
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMaps: options.sourceMaps,
                  outputStyle: 'expanded',
                  includePaths: [path.resolve(projectPath, './node_modules')]
                }
              }
            ]
          }
        ]
      },

      // post-css-loader still hasn't been updated to Webpack 2 API
      // in thea meantime, we need this workaround
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: [
              // allow importing values (variables) between css modules
              // see: https://github.com/css-modules/postcss-modules-values#usage
              postCSSModulesValues,

              // Support browser prefixes for any browser with greater than 5% markeshare
              autoprefixer({ browsers: ['> 5%'] })
            ]
          }
        })
      ]

      // plugins: shouldExtract ? [extractCss, extractSass] : []
    }
  }
}
