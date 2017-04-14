import { HotModuleReplacementPlugin } from 'webpack'
import HappyPack from 'happypack'
import path from 'path'
import fileExtensions from '../../file-extensions'
import actions from '../../actions'

export default {
  name: 'javaScript',
  configure ({ action, projectPath, javaScript = {}, coverage }) {
    return {
      plugins: [
        new HappyPack({
          id: 'babel',
          cache: false,
          verbose: false,
          tempDir: path.resolve(projectPath, '.sagui/happypack'),
          loaders: [{
            path: 'babel-loader',
            query: {
              babelrc: false,
              presets: [
                [require.resolve('babel-preset-env'), {
                  // Replaces require("babel-polyfill")
                  // with only the polyfills you need
                  // for the target browsers
                  useBuiltIns: true,

                  // Disables ES6 module transformation
                  // which Webpack2 can understand
                  modules: false,

                  targets: {
                    // Unfortunately we are bound to what UglifyJS
                    // currently supports as language features
                    // https://github.com/babel/babel-preset-env#targetsuglify
                    uglify: true
                  }
                }],
                require.resolve('babel-preset-flow'),
                require.resolve('babel-preset-react'),
                require.resolve('babel-preset-stage-3')
              ],
              plugins: [
                // Better React warnings and stack traces in development and testing
                // Might no longer be needed in the future
                // see: https://github.com/babel/babel/issues/4702
                ...(action === actions.DEVELOP || action === actions.TEST_UNIT ? [
                  [require.resolve('babel-plugin-transform-react-jsx-source'), {}],
                  [require.resolve('babel-plugin-transform-react-jsx-self'), {}]
                ] : []),

                ...(action === actions.DEVELOP ? [
                  [require.resolve('babel-plugin-react-transform'), {
                    transforms: [{
                      transform: 'react-transform-hmr',
                      imports: ['react'],
                      locals: ['module']
                    }]
                  }]
                ] : []),

                ...(action === actions.TEST_UNIT && coverage ? [
                  [require.resolve('babel-plugin-istanbul'), {
                    exclude: [
                      '**/*.spec.*',
                      '**/node_modules/**/*'
                    ]
                  }]
                ] : [])
              ]
            }
          }]
        }),
        ...(action === actions.DEVELOP ? [new HotModuleReplacementPlugin()] : [])
      ],

      module: {
        rules: [
          {
            test: fileExtensions.test.JAVASCRIPT,
            enforce: 'pre',
            loader: 'standard-loader',
            exclude: /node_modules/,
            options: {
              env: {
                jasmine: true
              },
              error: action !== actions.DEVELOP && action !== actions.TEST_UNIT,
              parser: 'babel-eslint',
              plugins: ['flowtype'],
              snazzy: true
            }
          },
          {
            test: fileExtensions.test.JAVASCRIPT,
            exclude: javaScript.transpileDependencies && javaScript.transpileDependencies.length > 0
              ? buildExcludeCheck(javaScript.transpileDependencies)
              : /node_modules/,
            loader: 'happypack/loader?id=babel'
          }
        ]
      }
    }
  }
}

/**
 * Take into consideration if the user wants any dependency
 * to be transpiled with Babel and returns an exclude check
 * function that can be used by Webpack
 */
function buildExcludeCheck (transpileDependencies = []) {
  const dependencyChecks = transpileDependencies.map((dependency) => (
    new RegExp(`node_modules/${dependency}`)
  ))

  // see: https://webpack.js.org/configuration/module/#condition
  return function (assetPath) {
    const shouldTranspile = dependencyChecks
      .reduce((result, check) => result || assetPath.match(check), false)

    if (shouldTranspile) { return false }
    return !!assetPath.match(/node_modules/)
  }
}
