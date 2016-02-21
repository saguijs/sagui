import path from './path'
import loadUserConfig from './load-user-config'
import webpackConfig from './webpack'
import karmaConfig from './karma'

/**
 * Creates a config object based on a "base" configuration
 *
 * @param  {Object} config base configuration
 * @return {Object} resulting configuration constructed by the internal plugins
 */
export default function configure (config = {}) {
  return [
    path,
    loadUserConfig,
    webpackConfig,
    karmaConfig
  ].reduce((config, plugin) => plugin(config), config)
}
