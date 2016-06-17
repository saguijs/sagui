import parentModule from 'parent-module'
import path from 'path'
import karma from './karma'
import webpack from './webpack'
import bootstrap from './bootstrap'
import cli from './cli'
import buildTargets from './build-targets'

export default function sagui (instanceOptions = {}) {
  const defaultOptions = {
    /**
     * Path
     */
    buildTarget: normalize(process.env.NODE_ENV),
    projectPath: path.dirname(parentModule()),
    saguiPath: path.join(__dirname, '..'),

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

  return {
    webpack: (options = {}) => webpack({ ...defaultOptions, ...instanceOptions, ...options }),
    karma: (options = {}) => karma({ ...defaultOptions, ...instanceOptions, ...options })
  }
}

/**
 * Exposes the Command Line Interface API
 */
sagui.cli = cli

const normalize = (env = buildTargets.DEVELOPMENT) => env.toLowerCase().trim()
