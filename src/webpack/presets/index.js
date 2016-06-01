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
    .filter((preset) => enabledPresets.indexOf(preset.name) !== -1)
    .reduce((webpackConfig, preset) => {
      return merge.smart(webpackConfig, preset.configure(config))
    }, {})

  return merge.smart(defaultWebpackConfig, userWebpackConfig)
}
