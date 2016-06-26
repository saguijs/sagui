import merge from 'webpack-merge'

import archetypes from './archetypes'
import presets from './presets'
import loaders from './loaders'
import splitArchetypes from './split-archetypes'

export default (saguiOptions = {}) => {
  return {
    ...saguiOptions,
    webpack: splitArchetypes(saguiOptions).map(
      (saguiOptionsByArchetype) => merge.smart(
        archetypes(saguiOptionsByArchetype),
        presets(saguiOptionsByArchetype),
        loaders(saguiOptionsByArchetype),
        saguiOptions.webpack || {}
      )
    )
  }
}
