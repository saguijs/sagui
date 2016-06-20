export default (configA, configB) => {
  return {
    ...configA,
    ...configB,
    reporters: [
      ...configA.reporters || [],
      ...configB.reporters || []
    ]
  }
}
