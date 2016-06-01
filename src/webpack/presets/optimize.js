import { optimize } from 'webpack'

export default {
  name: 'optimize',
  configure ({ buildTarget }) {
    const plugins = []

    if (buildTarget === 'production') {
      plugins.push(new optimize.DedupePlugin())

      plugins.push(new optimize.UglifyJsPlugin({
        compress: {
          // disable warning messages
          // since they are very verbose
          // and provide little value
          warnings: false
        }
      }))
    }

    return {
      plugins
    }
  }
}
