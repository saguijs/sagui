import merge from 'webpack-merge'

import babel from './babel'
import base from './base'
import defineNodeENV from './define-node-env'
import eslint from './eslint'
import fonts from './fonts'
import images from './images'
import json from './json'
import library from './library'
import pages from './pages'
import style from './style'
import videos from './videos'

const presets = [
  babel,
  base,
  defineNodeENV,
  eslint,
  fonts,
  images,
  json,
  library,
  pages,
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
