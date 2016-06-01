import presets from './presets'
import splitArchetypeConfigs from './split-archetype-configs'

export default (config) => (webpack = {}) => {
  const { sagui = {}, ...userWebpackConfig } = webpack

  return splitArchetypeConfigs(sagui).map((archetypes) => {
    return presets({ ...config, ...archetypes }, userWebpackConfig)
  })
}
