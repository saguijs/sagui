import webpack from 'webpack'
import { log } from '../util/log'

export default function build (saguiOptions) {
  const compiler = webpack(saguiOptions.webpack)

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

    if (!saguiOptions.watch && (err || hasSoftErrors)) {
      process.on('exit', function () {
        process.exit(1)
      })

      return
    }

    log('Build complete, files written in the dist/ folder.')
  })
}
