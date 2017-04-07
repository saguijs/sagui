import webpack from 'webpack'
import { logError, log } from '../util/log'
import Server from 'webpack-dev-server'

/**
 * Development server
 */
export default (saguiConfig, webpackConfig) => new Promise((resolve, reject) => {
  const options = {
    hot: true,
    noInfo: true,
    ...saguiConfig.develop
  }

  try {
    const server = new Server(webpack(setupHMR(webpackConfig)), options)

    server.listeningApp.on('error', function (e) {
      if (e.code === 'EADDRINUSE') {
        logError(`Server failed to started at http://localhost:${saguiConfig.port}. Port already used.`)
        reject(new Error('This port is already used'))
      }
    })

    server.listen(saguiConfig.port, '0.0.0.0', (err) => {
      if (err) {
        logError(`Server failed to started at http://localhost:${saguiConfig.port}`)
        reject(err)
      } else {
        log(`Server started at http://localhost:${saguiConfig.port}/webpack-dev-server/`)
      }
    })
  } catch (e) {
    logError('Server failed to start.')
    logError(e.stack || e)
    reject(e)
  }
})

/**
 * HMR bundle setup based on code from
 * https://github.com/webpack/webpack-dev-server/blob/master/bin/webpack-dev-server.js
 */
function setupHMR (webpackConfig) {
  return webpackConfig.map((webpack) => ({
    ...webpack,
    entry: concatHMRBundle(webpack.entry)
  }))
}

function concatHMRBundle (entry) {
  const devClient = [
    require.resolve('webpack-dev-server/client/') + '?/',
    'webpack/hot/dev-server'
  ]

  if (typeof entry === 'object' && !Array.isArray(entry)) {
    return Object.keys(entry).reduce((entries, key) => ({
      ...entries,
      [key]: devClient.concat(entry[key])
    }), {})
  } else {
    return devClient.concat(entry)
  }
}
