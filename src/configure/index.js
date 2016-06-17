import karma from './karma'
import webpack from './webpack'

const DEFAULT = {
  /**
   * Miscellaneous
   * @type {Boolean}
   */
  hotReloading: false,
  optimize: false,
  defineNodeEnv: false,
  clean: false,
  testCoverage: false,
  lint: false,

  /**
   * Default application is a single index page
   */
  pages: ['/index'],

  disabledLoaders: [],

  webpack: {},

  karma: {}
}

export default function sagui (saguiOptions = {}) {
  const configure = {
    webpack: (runtimeOptions = {}) => (
      webpack({
        ...DEFAULT,
        ...saguiOptions,
        ...runtimeOptions
      })
    ),

    karma: (runtimeOptions = {}) => (
      karma({
        ...DEFAULT,
        ...saguiOptions,
        ...runtimeOptions,
        webpack: runtimeOptions.webpack || configure.webpack(runtimeOptions)
      })
    )
  }

  return configure
}
