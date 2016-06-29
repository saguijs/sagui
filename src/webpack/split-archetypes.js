/**
 * Given one configuration object, it returns and array of more than one
 * with archetype specific configuration
 *
 * This a requirement because when we build libraries, we can only have a
 * single entry-point in the webpack configuration.
 *
 * This function turns { libraries } into { library }, check the tests for
 * more information.
 */
export default function (saguiOptions) {
  const archetypes = []

  const { pages, libraries, ...otherOptions } = saguiOptions

  if (pages && pages.length > 0) {
    archetypes.push({ pages, ...otherOptions })
  }

  if (libraries && libraries.length > 0) {
    libraries.forEach((library) => {
      archetypes.push({
        library,
        ...otherOptions
      })
    })
  }

  return archetypes
}
