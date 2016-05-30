import merge from 'webpack-merge'

import archetypeLibrary from './archetype-library'
import archetypePages from './archetype-pages'
import babel from './babel'
import base from './base'
import defineNodeENV from './define-node-env'
import eslint from './eslint'
import images from './images'
import fonts from './fonts'
import json from './json'
import style from './style'
import videos from './videos'

const presets = [
  archetypeLibrary,
  archetypePages,
  babel,
  base,
  defineNodeENV,
  eslint,
  images,
  fonts,
  json,
  style,
  videos
]

export default (config, userWebpackConfig = {}) => {
  const { disabledPresets = [] } = config

  const defaultWebpackConfig = presets
    .filter((plugin) => disabledPresets.indexOf(plugin.name) === -1)
    .reduce((webpackConfig, plugin) => {
      return merge.smart(webpackConfig, plugin.configure(config))
    }, {})

  return merge.smart(defaultWebpackConfig, userWebpackConfig)
}
