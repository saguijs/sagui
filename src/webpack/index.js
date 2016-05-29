import presets from './presets'
import splitArchetypeConfigs from './split-archetype-configs'

export default ({ buildTarget, projectPath, saguiPath }) => (webpack = {}) => {
  const { sagui = {}, ...userWebpackConfig } = webpack

  return splitArchetypeConfigs(sagui).map((archetypes) => {
    const config = { buildTarget, projectPath, saguiPath, ...archetypes }
    return presets(config, userWebpackConfig)
  })
}
