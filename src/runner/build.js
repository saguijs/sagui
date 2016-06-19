import webpack from 'webpack'

export default (saguiOptions) => new Promise((resolve, reject) => {
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
        reject()
      })
    } else {
      resolve()
    }
  })
})
