import presets from './presets'
import splitArchetypes from './split-archetypes'

export default (saguiOptions = {}) => {
  return splitArchetypes(saguiOptions).map(
    (saguiOptionsByArchetype) => presets(saguiOptionsByArchetype)
  )
}
