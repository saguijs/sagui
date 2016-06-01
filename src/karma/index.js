import presets from './presets'

export default (config = {}) => (userConfig) => (karmaObject) => {
  const { sagui = {}, ...userKarmaConfig } = userConfig
  const result = presets({ ...config, ...sagui }, userKarmaConfig)
  karmaObject.set(result)
}
