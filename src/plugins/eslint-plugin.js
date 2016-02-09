import merge from 'webpack-merge'
import path from 'path'

export default function babelPlugin (env) {
  const { saguiPath, watch, webpackConfig: base } = env

  const webpackConfig = merge(base, {
    eslint: {
      configFile: path.join(saguiPath, '.eslintrc'),
      failOnError: !watch
    },

    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loader: 'eslint',
          exclude: /node_modules/
        }
      ]
    }
  })

  return { ...env, webpackConfig }
}
