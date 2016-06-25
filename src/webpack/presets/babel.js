import path from 'path'
import reactTransform from 'babel-plugin-react-transform'
import fileExtensions from '../../file-extensions'
import buildTargets from '../../build-targets'

export default {
  name: 'babel',
  configure ({ buildTarget, projectPath, javaScript = {} }) {
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
        env: buildTarget === buildTargets.DEVELOPMENT ? hmrEnv : {}
      },

      module: {
        loaders: [
          {
            test: fileExtensions.JAVASCRIPT,
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
