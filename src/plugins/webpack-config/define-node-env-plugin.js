import merge from 'webpack-merge'
import { DefinePlugin } from 'webpack'

export default function babelPlugin (env) {
  const { webpackConfig: base } = env

  const webpackConfig = merge(base, {
    plugins: [
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  })

  return { ...env, webpackConfig }
}
