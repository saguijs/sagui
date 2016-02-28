import configureWepackPlugins from './plugins'
import splitArchetypeConfigs from './split-archetype-configs'

export default function configureWepack (config) {
  const archetypes = splitArchetypeConfigs(config)

  const webpackConfig = archetypes.map(configureWepackPlugins)

  return { ...config, webpackConfig }
}
