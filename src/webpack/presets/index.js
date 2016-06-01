import merge from 'webpack-merge'

import babel from './babel'
import base from './base'
import clean from './clean'
import defineNodeENV from './define-node-env'
import eslint from './eslint'
import fonts from './fonts'
import images from './images'
import json from './json'
import library from './library'
import optimize from './optimize'
import pages from './pages'
import style from './style'
import videos from './videos'

const presets = [
  babel,
  base,
  clean,
  defineNodeENV,
  eslint,
  fonts,
  images,
  json,
  library,
  optimize,
  pages,
  style,
  videos
]

export default (config, userWebpackConfig = {}) => {
  const { enabledPresets = [] } = config

  const defaultWebpackConfig = presets
    .filter((plugin) => enabledPresets.indexOf(plugin.name) !== -1)
    .reduce((webpackConfig, plugin) => {
      return merge.smart(webpackConfig, plugin.configure(config))
    }, {})

  return merge.smart(defaultWebpackConfig, userWebpackConfig)
}
