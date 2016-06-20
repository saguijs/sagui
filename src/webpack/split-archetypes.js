/**
 * Given one configuration object, it returns and array of more than one
 * with archetype specific configuration
 */
export default function (saguiOptions) {
  const archetypes = []

  const { pages, library, ...otherOptions } = saguiOptions

  if (pages && pages.length > 0) {
    archetypes.push({ pages, ...otherOptions })
  }

  if (library && Object.keys(library).length > 0) {
    archetypes.push({ library, ...otherOptions })
  }

  return archetypes
}
