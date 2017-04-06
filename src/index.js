import path from 'path'
import cli from './cli'
import loadProjectConfig from './load-project-config'
import configureKarma from './karma.conf'
import configureWebpack from './webpack.config'
import run from './runner'
import pipeline from './util/pipeline'

const DEFAULT_OPTIONS = {
  port: 3000,
  saguiPath: path.join(__dirname, '../'),
  optimize: false,
  coverage: false,
  pages: [],
  disabledLoaders: [],
  javaScript: {},
  webpack: {},
  karma: {}
}

/**
 * Sagui
 *
 * This function takes a single sagui options object,
 * prepare all the required Webpack / Karma configurations
 * and execute the requested action.
 *
 * @param {Object} options Sagui options object
 * @param {string} options.projectPath Full path of the root directory of the project being built.
 * @param {string} options.action Action: (develop, test, build)
 * @param {string[]} [options.javaScript.buildDependencies = true] Which dependencies to transpile (Ex: ['ui-react-components'])
 * @param {boolean} [options.optimize = false] Optimize the output (minify, dedup...)
 * @param {boolean} [options.coverage = false] Outputs test coverage while running the tests
 * @param {string[]} [options.pages = []] Define a build output based on a HTML and JS files.
 * @param {string[]} [options.disabledLoaders = []] Disables loaders for specific file types.
 * @param {Object} [options.webpack] Webpack configuration object to extend the internal configuration.
 * @param {Object} [options.karma] Karma configuration object to extend the internal configuration.
 */
const sagui = (options = {}) => {
  const saguiOptions = pipeline(
    (saguiOptions) => ({ ...saguiOptions, ...loadProjectConfig(saguiOptions) }),
    (saguiOptions) => ({ ...saguiOptions, webpack: configureWebpack(saguiOptions) }),
    (saguiOptions) => ({ ...saguiOptions, karma: configureKarma(saguiOptions) })
  )({ ...DEFAULT_OPTIONS, ...options })

  return {
    ...saguiOptions,
    run: () => run(saguiOptions)
  }
}

/**
 * Command Line Interface
 */
sagui.cli = cli

export default sagui
