import reactTransform from 'babel-plugin-react-transform'
import es2015 from 'babel-preset-es2015'
import stage0 from 'babel-preset-stage-0'
import react from 'babel-preset-react'

export default {
  name: 'webpack-babel',
  configure ({ buildTarget }) {
    const hmrEnv = {
      development: {
        plugins: [reactTransform],
        extra: {
          'react-transform': {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }]
          }
        }
      }
    }

    return {
      babel: {
        presets: [es2015, stage0, react],
        env: buildTarget === 'develop' ? hmrEnv : {}
      },

      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
          }
        ]
      },

      resolve: {
        extensions: ['', '.js', '.jsx']
      }
    }
  }
}
