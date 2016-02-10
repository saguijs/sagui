import merge from 'webpack-merge'

export default function babelPlugin (env) {
  const { webpackConfig: base } = env

  const webpackConfig = merge(base, {
    module: {
      loaders: [
        {
          test: /\.(json)$/,
          loader: 'json-loader'
        }
      ]
    }
  })

  return { ...env, webpackConfig }
}
