import base from './base'
import browsers from './browsers'
import frameworks from './frameworks'
import reporters from './reporters'

const presets = [
  base,
  browsers,
  frameworks,
  reporters
]

export default (config, userKarmaConfig = {}) => {
  const { enabledPresets = [] } = config
  const { webpack, ...karmaConfig } = userKarmaConfig

  const defaultKarmaConfig = presets
    .filter((preset) => enabledPresets.indexOf(preset.name) !== -1)
    .reduce((karmaConfig, preset) => {
      return { ...karmaConfig, ...preset.configure(config) }
    }, {})

  return {
    ...defaultKarmaConfig,
    ...karmaConfig,

    // there can be multiple webpack configurations
    // and althought harmless to have them all running the tests
    // it is not required and only produces double execution
    webpack: Array.isArray(webpack) ? webpack[0] : webpack
  }
}
