import presets from './presets'

export default (saguiOptions = {}) => {
  return {
    ...saguiOptions,
    karma: presets(saguiOptions)
  }
}
