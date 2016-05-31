import presets from './presets'

export default ({ projectPath } = {}) => (karma) => (config) => {
  const { sagui = {}, ...userKarmaConfig } = karma
  const saguiConfig = { projectPath, ...sagui }
  const result = presets(saguiConfig, userKarmaConfig)
  config.set(result)
}
