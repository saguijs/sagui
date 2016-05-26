import merge from 'webpack-merge'

import archetypeLibrary from './archetype-library'
import archetypePages from './archetype-pages'
import babel from './babel'
import base from './base'
import css from './css'
import defineNodeENV from './define-node-env'
import eslint from './eslint'
import images from './images'
import json from './json'
import sass from './sass'
import videos from './videos'

const plugins = [
  archetypeLibrary,
  archetypePages,
  babel,
  base,
  css,
  defineNodeENV,
  eslint,
  images,
  json,
  sass,
  videos
]

export default (config, userWebpackConfig = {}) => {
  const { disabledSaguiPresets = [] } = config

  const defaultWebpackConfig = plugins
    .filter((plugin) => disabledSaguiPresets.indexOf(plugin.name) === -1)
    .reduce((webpackConfig, plugin) => {
      return merge.smart(webpackConfig, plugin.configure(config))
    }, {})

  return merge.smart(defaultWebpackConfig, userWebpackConfig)
}
