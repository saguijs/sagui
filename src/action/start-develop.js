import express from 'express'
import webpack from 'webpack'
import { logError, log } from '../util/log'


export default function startDevelop (webpackConfig) {
  const app = express()
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.listen(3000, 'localhost', onServerStarted)
}


function onServerStarted (err) {
  if (err) {
    logError(err)
    return
  }

  log('Listening at http://localhost:3000')
}
