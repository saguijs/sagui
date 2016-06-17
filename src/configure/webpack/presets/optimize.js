import { optimize } from 'webpack'
import buildTargets from '../../../build-targets'

export default {
  name: 'optimize',
  configure ({ buildTarget }) {
    const plugins = []

    if (buildTarget === buildTargets.PRODUCTION) {
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
