import base from './base'
import browsers from './browsers'
import coverage from './coverage'
import frameworks from './frameworks'
import mergeKarma from './merge-karma'
import reporters from './reporters'
import webpack from './webpack'

const presets = [
  base,
  browsers,
  coverage,
  frameworks,
  reporters,
  webpack
]

export default (options) => {
  const karmaConfig = presets
    .reduce((karmaConfig, preset) => (
      mergeKarma(karmaConfig, preset.configure(options))
    ), {})

  return mergeKarma(
    karmaConfig,
    options.karma || {}
  )
}
