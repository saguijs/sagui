import merge from 'webpack-merge'

import babel from './babel'
import base from './base'
import clean from './clean'
import coverage from './coverage'
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
  coverage,
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

export default (saguiOptions) => {
  const webpackConfig = presets
    .reduce((webpackConfig, preset) => (
      merge.smart(webpackConfig, preset.configure(saguiOptions))
    ), {})

  return merge.smart(
    webpackConfig,
    saguiOptions.webpack || {}
  )
}
