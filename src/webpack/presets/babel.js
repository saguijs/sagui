import reactTransform from 'babel-plugin-react-transform'
import sagui from 'babel-preset-sagui'

export default {
  name: 'babel',
  configure ({ buildTarget, babel = {} }) {
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
        presets: [sagui],
        env: buildTarget === 'development' ? hmrEnv : {}
      },

      module: {
        loaders: [
          {
            test: /\.(jsx?|es6)$/,
            exclude: /node_modules/,
            loader: 'babel',
            ...babel
          }
        ]
      }
    }
  }
}
