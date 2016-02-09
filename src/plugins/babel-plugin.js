import merge from 'webpack-merge'
import reactTransform from 'babel-plugin-react-transform'

export default function babelPlugin (env) {
  const { webpackConfig: base } = env

  const webpackConfig = merge(base, {
    babel: {
      optional: ['runtime'],
      stage: 0,
      env: {
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
  })

  return { ...env, webpackConfig }
}
