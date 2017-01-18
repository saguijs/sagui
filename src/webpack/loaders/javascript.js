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
      plugins: action === actions.DEVELOP ? [new HotModuleReplacementPlugin()] : [],

      module: {
        rules: [
          {
            test: fileExtensions.test.JAVASCRIPT,
            include: [
              path.join(projectPath, 'src'),
              ...userPaths
            ],
            loader: 'babel-loader',
            options: {
              babelrc: path.join(projectPath, '.babelrc'),
              plugins: babelPlugins(action, coverage)
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
