import express from 'express'
import webpack from 'webpack'

/**
 * Development server
 */
export default (saguiOptions) => new Promise((resolve, reject) => {
  const app = express()
  const compiler = webpack(saguiOptions.webpack)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.listen(3000, '0.0.0.0', (err) => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})
