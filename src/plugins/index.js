import path from './path'
import userSettings from './user-settings'
import webpackConfig from './webpack-config'
import karmaConfig from './karma-config'

/**
 * Passes through all the available plugins setting up the environment
 *
 * @param  {Object} env starting environment
 * @return {Object} resulting environment constructed by the plugins
 */
export default function runPlugins (env = {}) {
  return [
    path,
    userSettings,
    webpackConfig,
    karmaConfig
  ].reduce((env, plugin) => plugin(env), env)
}
