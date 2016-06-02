import path from 'path'
import reactTransform from 'babel-plugin-react-transform'
import fileExtensions from '../file-extensions'

export default {
  name: 'babel',
  configure ({ buildTarget, projectPath }) {
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

    return {
      babel: {
        babelrc: path.join(projectPath, '.babelrc'),
        env: buildTarget === 'development' ? hmrEnv : {}
      },

      module: {
        loaders: [
          {
            test: fileExtensions.JAVASCRIPT,
            exclude: /node_modules/,
            loader: 'babel'
          }
        ]
      }
    }
  }
}
