import { HotModuleReplacementPlugin } from 'webpack'
import path from 'path'
import reactTransform from 'babel-plugin-react-transform'
import istanbul from 'babel-plugin-istanbul'
import fileExtensions from '../../file-extensions'
import actions from '../../actions'

export default {
  name: 'javaScript',
  configure ({ action, projectPath, javaScript = {}, coverage }) {
    const userPaths = (javaScript.transpileDependencies || []).map((dependency) => (
      path.join(projectPath, 'node_modules', dependency)
    ))

    return {
      babel: {
        babelrc: path.join(projectPath, '.babelrc'),
        plugins: babelPlugins(action, coverage)
      },

      plugins: action === actions.DEVELOP ? [new HotModuleReplacementPlugin()] : [],

      resolve: {
        extensions: fileExtensions.list.JAVASCRIPT
      },

      module: {
        loaders: [
          {
            test: fileExtensions.test.JAVASCRIPT,
            include: [
              path.join(projectPath, 'src'),
              ...userPaths
            ],
            loader: 'babel',
            query: {
              // enabling it breaks source maps
              compact: false
            }
          }
        ]
      }
    }
  }
}

const babelPlugins = (action, coverage) => {
  if (action === actions.DEVELOP) {
    return [
      [reactTransform, {
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
      [istanbul, {
        exclude: [
          '**/*.spec.*',
          '**/node_modules/**/*'
        ]
      }]
    ]
  }

  return []
}
