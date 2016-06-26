import merge from 'webpack-merge'

import base from './base'
import clean from './clean'
import coverage from './coverage'
import defineNodeENV from './define-node-env'
import eslint from './eslint'
import optimize from './optimize'

const presets = [
  base,
  clean,
  coverage,
  defineNodeENV,
  eslint,
  optimize
]

export default (saguiOptions) => (
  presets.reduce((webpackConfig, preset) => (
    merge.smart(webpackConfig, preset.configure(saguiOptions))
  ), {})
)
