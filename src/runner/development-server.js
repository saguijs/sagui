import webpack from 'webpack'
import { logError, log } from '../util/log'
import Server from 'webpack-dev-server'

/**
 * Development server
 */
export default (saguiOptions) => new Promise((resolve, reject) => {
  const options = {
    info: false,
    quiet: true,
    inline: true,
    historyApiFallback: saguiOptions.pages && saguiOptions.pages[0] && `${saguiOptions.pages[0]}.html`
  }

  new Server(webpack(saguiOptions.webpack), options).listen(saguiOptions.port, '0.0.0.0', (err) => {
    if (err) {
      logError(`Server failed to started at http://localhost:${saguiOptions.port}`)
      reject(err)
    } else {
      log(`Server started at http://localhost:${saguiOptions.port}/webpack-dev-server/`)
    }
  })
})
