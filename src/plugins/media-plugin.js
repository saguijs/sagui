import merge from 'webpack-merge'

export default function babelPlugin (env) {
  const { webpackConfig: base } = env

  const webpackConfig = merge(base, {
    module: {
      loaders: [
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
        }
      ]
    }
  })

  return { ...env, webpackConfig }
}
