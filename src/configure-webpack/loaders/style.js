import path from 'path'
import webpack from 'webpack'
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
  configure ({ action, optimize, pages, projectPath, style = {}, browsers }) {
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

    const projectSourcePath = path.join(projectPath, 'src')

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
      `css-loader?${cssModules}&${sourceMaps}&importLoaders=2&localIdentName=${localIdentName}`,
      'postcss-loader',
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
            // Fixes an issue with colliding CSS Modules
            // There is an integration test to validate it
            // see:
            //  - https://github.com/saguijs/sagui/issues/338
            //  - https://github.com/webpack-contrib/css-loader/issues/413#issuecomment-283944881
            context: projectSourcePath,

            postcss: [
              autoprefixer({ browsers })
            ]
          }
        }),

        ...(shouldExtract ? [extractCss, extractSass] : [])
      ]
    }
  }
}
