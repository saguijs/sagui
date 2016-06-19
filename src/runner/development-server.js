import express from 'express'
import webpack from 'webpack'

import { logError, log } from '../util/log'

/**
 * Development server
 * @return express application
 */
export default function (saguiOptions) {
  const app = express()
  const compiler = webpack(saguiOptions.webpack)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.listen(3000, '0.0.0.0', onServerStarted)
}

function onServerStarted (err) {
  if (err) {
    logError(err)
    return
  }

  log('Listening at http://localhost:3000')
}
