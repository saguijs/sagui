import webpack from 'webpack'
import { logError, log } from '../util/log'

export default (saguiConfig, webpackConfig) => new Promise((resolve, reject) => {
  const compiler = webpack(webpackConfig)

  compiler.run((err, stats) => {
    var softErrors = !err && stats.toJson().errors
    var hasSoftErrors = softErrors && softErrors.length > 0

    if (err || hasSoftErrors) {
      logError('Build failed.')

      if (err) {
        console.error(err.stack || err)
        if (err.details) console.error(err.details)
      }

      if (hasSoftErrors) {
        softErrors.forEach(function (error) {
          console.error(error)
        })
      }

      reject()
    } else {
      log('Built successfull.')
      resolve()
    }
  })
})
