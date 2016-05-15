import path from './path'
import loadUserConfig from './load-user-config'
import webpack from './webpack'
import karma from './karma'

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
    webpack,
    karma
  ].reduce((config, plugin) => plugin(config), config)
}

export function configureWebpack (userWebpackConfig = {}) {
  const { sagui: config, ...webpackConfig } = userWebpackConfig

  return [
    path,
    webpack
  ].reduce((config, plugin) => plugin(config), { ...config, webpackConfig }).webpackConfig
}

export function configureKarma (userWebpackConfig, userKarmaConfig = {}) {
  const { sagui: config, ...webpackConfig } = userWebpackConfig

  return (karmaConfig) => {
    const saguiConfig = [
      path,
      karma
    ].reduce((config, plugin) => plugin(config), { ...config, webpackConfig, karmaConfig: userKarmaConfig })

    karmaConfig.set(saguiConfig.karmaConfig)
  }
}
