/**
 * Given one configuration object, it returns and array of more than one
 * with archetype specific configuration
 *
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
export default function splitArchetypeConfigs (config) {
  const archetypes = []

  const { pages, library, ...otherConfig } = config

  if (pages && pages.length > 0) {
    archetypes.push({ pages, ...otherConfig })
  }

  if (library && Object.keys(library).length > 0) {
    archetypes.push({ library, ...otherConfig })
  }

  return archetypes
}
