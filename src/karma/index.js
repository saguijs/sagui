import presets from './presets'

export default (options = {}) => (karma) => {
  karma.set(presets(options))
}
