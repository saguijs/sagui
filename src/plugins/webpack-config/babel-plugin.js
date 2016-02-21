import merge from 'webpack-merge'
import reactTransform from 'babel-plugin-react-transform'

export default function babelPlugin (env) {
  const { buildTarget, webpackConfig: base } = env

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

  const webpackConfig = merge(base, {
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
  })

  return { ...env, webpackConfig }
}
