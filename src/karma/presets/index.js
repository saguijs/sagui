import base from './base'
import browsers from './browsers'
import coverage from './coverage'
import frameworks from './frameworks'
import mergeKarma from './merge-karma'
import reporters from './reporters'

const presets = [
  base,
  browsers,
  coverage,
  frameworks,
  reporters
]

export default (config, userKarmaConfig = {}) => {
  const { enabledPresets = [] } = config
  const { webpack, ...karmaConfig } = userKarmaConfig

  const defaultKarmaConfig = presets
    .filter((preset) => enabledPresets.indexOf(preset.name) !== -1)
    .reduce((karmaConfig, preset) => mergeKarma(karmaConfig, preset.configure(config)), {})
  console.log(defaultKarmaConfig)
  return {
    ...defaultKarmaConfig,
    ...karmaConfig,

    // there can be multiple webpack configurations
    // and although harmless to have them all running the tests
    // it is not required and only produces double execution
    webpack: Array.isArray(webpack) ? webpack[0] : webpack
  }
}
