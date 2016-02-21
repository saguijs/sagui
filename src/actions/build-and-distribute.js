import webpack from 'webpack'
import { logError } from '../util/log'

export default function buildAndDistribute ({ webpackConfig, watch }) {
  const compiler = webpack(webpackConfig)

  compiler.run((err, stats) => {
    var softErrors = !err && stats.toJson().errors
    var hasSoftErrors = softErrors && softErrors.length > 0

    if (err) {
      console.error(err.stack || err)
      if (err.details) console.error(err.details)
    }

    if (hasSoftErrors) {
      softErrors.forEach(function (error) {
        console.error(error)
      })
    }

    if (!watch && (err || hasSoftErrors)) {
      process.on('exit', function () {
        process.exit(1)
      })

      return
    }

    logError('Build complete, files written in the dist/ folder.')
  })
}
