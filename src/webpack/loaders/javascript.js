import { HotModuleReplacementPlugin } from 'webpack'
import path from 'path'
import reactTransform from 'babel-plugin-react-transform'
import fileExtensions from '../../file-extensions'
import actions from '../../actions'

export default {
  name: 'javaScript',
  configure ({ action, projectPath, javaScript = {} }) {
    const hmrEnv = {
      development: {
        plugins: [
          [reactTransform, {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }]
          }]
        ]
      }
    }

    const userPaths = (javaScript.transpileDependencies || []).map((dependency) => (
      path.join(projectPath, 'node_modules', dependency)
    ))

    return {
      babel: {
        babelrc: path.join(projectPath, '.babelrc'),
        env: action === actions.DEVELOP ? hmrEnv : {}
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
            loader: 'babel'
          }
        ]
      }
    }
  }
}
