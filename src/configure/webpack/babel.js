import reactTransform from 'babel-plugin-react-transform'

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
        optional: ['runtime'],
        stage: 0,
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
      }
    }
  }
}
