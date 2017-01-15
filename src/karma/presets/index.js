import mergeKarma from '../../util/merge-karma'

import base from './base'
import browsers from './browsers'
import coverage from './coverage'
import frameworks from './frameworks'
import reporters from './reporters'
import webpack from './webpack'
import actions from '../../actions'

const presets = [
  base,
  browsers,
  coverage,
  frameworks,
  reporters,
  webpack
]

export default (saguiOptions) => {
  const karmaActionConfig = saguiOptions.action === actions.TEST_INTEGRATION
    ? saguiOptions.integration_test.karma || saguiOptions.karma || {}
    : saguiOptions.karma || {}

  const karmaConfig = presets
    .reduce((karmaConfig, preset) => (
      mergeKarma(karmaConfig, preset.configure(saguiOptions))
    ), {})

  return mergeKarma(
    karmaConfig,
    karmaActionConfig
  )
}
