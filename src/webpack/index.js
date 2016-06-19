import presets from './presets'
import splitArchetypes from './split-archetypes'

export default (saguiOptions = {}) => {
  return {
    ...saguiOptions,
    webpack: splitArchetypes(saguiOptions).map(
      (saguiOptionsByArchetype) => presets(saguiOptionsByArchetype)
    )
  }
}
