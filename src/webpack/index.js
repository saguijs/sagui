import presets from './presets'
import splitArchetypes from './split-archetype-configs'

export default (options = {}) => {
  return splitArchetypes(options).map((optionsByArchetype) => presets(optionsByArchetype))
}
