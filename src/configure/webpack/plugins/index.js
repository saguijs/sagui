import merge from 'webpack-merge'

import archetypeLibrary from './archetype-library'
import archetypePages from './archetype-pages'
import babel from './babel'
import base from './base'
import cssModules from './css-modules'
import defineNodeENV from './define-node-env'
import eslint from './eslint'
import json from './json'
import media from './media'
import scss from './scss'

export const plugins = [
  archetypeLibrary,
  archetypePages,
  babel,
  base,
  cssModules,
  defineNodeENV,
  eslint,
  json,
  media,
  scss
]

export default function configureWebpackPlugins (config) {
  const { disabledPlugins = [], webpackConfig: userWebpackConfig, ...extraConfig } = config

  const defaultWebpackConfig = plugins
    .filter(plugin => disabledPlugins.indexOf(plugin.name) === -1)
    .reduce((webpackConfig, plugin) => {
      return merge.smart(webpackConfig, plugin.configure(extraConfig))
    }, {})

  return merge.smart(defaultWebpackConfig, userWebpackConfig)
}
