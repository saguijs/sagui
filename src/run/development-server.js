import webpack from 'webpack'
import { logError, log } from '../util/log'
import Server from 'webpack-dev-server'

/**
 * Development server
 */
export default (saguiConfig, webpackConfig) => new Promise((resolve, reject) => {
  const options = {
    hot: true,
    historyApiFallback: saguiConfig.pages && saguiConfig.pages[0] && `${saguiConfig.pages[0]}.html`,
    ...saguiConfig.develop
  }

  try {
    new Server(webpack(setupHMR(webpackConfig)), options).listen(saguiConfig.port, '0.0.0.0', (err) => {
      if (err) {
        logError(`Server failed to started at http://localhost:${saguiConfig.port}`)
        reject(err)
      } else {
        log(`Server started at http://localhost:${saguiConfig.port}/webpack-dev-server/`)
      }
    })
  } catch (e) {
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
