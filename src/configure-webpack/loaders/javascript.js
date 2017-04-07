import { HotModuleReplacementPlugin } from 'webpack'
import HappyPack from 'happypack'
import path from 'path'
import fileExtensions from '../../file-extensions'
import actions from '../../actions'

export default {
  name: 'javaScript',
  configure ({ action, projectPath, javaScript = {}, coverage }) {
    const userPaths = (javaScript.transpileDependencies || []).map((dependency) => (
      path.join(projectPath, 'node_modules', dependency)
    ))

    return {
      plugins: [
        new HappyPack({
          id: 'babel',
          cache: false,
          verbose: false,
          loaders: [{
            path: 'babel-loader',
            query: {
              babelrc: false,
              presets: [
                [require.resolve('babel-preset-env'), {
                  // Replaces require("babel-polyfill")
                  // with only the polyfills you need
                  // for the target browsers
                  useBuiltIns: true
                }],
                require.resolve('babel-preset-react'),
                require.resolve('babel-preset-stage-3')
              ],
              plugins: babelPlugins(action, coverage)
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
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
              configFile: path.join(projectPath, '.eslintrc')
            }
          },
          {
            test: fileExtensions.test.JAVASCRIPT,
            include: [
              path.join(projectPath, 'src'),
              ...userPaths
            ],
            loader: 'happypack/loader?id=babel'
          }
        ]
      }
    }
  }
}

const babelPlugins = (action, coverage) => {
  if (action === actions.DEVELOP) {
    return [
      [require.resolve('babel-plugin-react-transform'), {
        transforms: [{
          transform: 'react-transform-hmr',
          imports: ['react'],
          locals: ['module']
        }]
      }]
    ]
  }

  if (action === actions.TEST_UNIT && coverage) {
    return [
      [require.resolve('babel-plugin-istanbul'), {
        exclude: [
          '**/*.spec.*',
          '**/node_modules/**/*'
        ]
      }]
    ]
  }

  return []
}
