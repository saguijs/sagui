import mergeKarma from '../../util/merge-karma'

import base from './base'
import browsers from './browsers'
import coverage from './coverage'
import frameworks from './frameworks'
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

export default (saguiOptions) => {
  const karmaConfig = presets
    .reduce((karmaConfig, preset) => (
      mergeKarma(karmaConfig, preset.configure(saguiOptions))
    ), {})

  return mergeKarma(
    karmaConfig,
    saguiOptions.karma || {}
  )
}
