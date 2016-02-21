import { DefinePlugin } from 'webpack'

export default function defineNodeEnvPlugin () {
  return {
    plugins: [
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  }
}
