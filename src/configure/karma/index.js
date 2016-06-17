import presets from './presets'

export default (saguiOptions = {}) => (karma) => {
  karma.set(presets(saguiOptions))
}
