import merge from 'webpack-merge'

import base from './base'
import clean from './clean'
import defineNodeENV from './define-node-env'
import eslint from './eslint'
import optimize from './optimize'

const presets = [
  base,
  clean,
  defineNodeENV,
  eslint,
  optimize
]

export default (saguiOptions) => (
  presets.reduce((webpackConfig, preset) => (
    merge.smart(webpackConfig, preset.configure(saguiOptions))
  ), {})
)
