import uniq from 'lodash.uniq'

export default (configA, configB) => {
  return {
    ...configA,
    ...configB,
    reporters: uniq([
      ...configA.reporters || [],
      ...configB.reporters || []
    ])
  }
}
