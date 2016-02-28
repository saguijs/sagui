import { logError, log } from '../util/log'
import server from '../server'

export default function startDevelop ({ webpackConfig }) {
  const app = server(webpackConfig)
  app.listen(3000, '0.0.0.0', onServerStarted)
}

function onServerStarted (err) {
  if (err) {
    logError(err)
    return
  }

  log('Listening at http://localhost:3000')
}
