import path from 'path'
import cli from './cli'
import loadProjectSaguiConfig from './load-project-sagui-config'
import configureKarma from './configure-karma'
import configureWebpack from './configure-webpack'
import run from './run'

/* eslint no-duplicate-imports: 0 */
export { MissingPackageJSON, SaguiPath } from './load-project-sagui-config'

const DEFAULT_SAGUI_CONFIG = {
  port: 3000,
  browsers: ['> 5%'],
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
 * This function takes a single sagui config object,
 * prepare all the required Webpack / Karma configurations
 * and execute the requested action.
 *
 * @param {Object} saguiConfig Sagui config object
 * @param {string} saguiConfig.projectPath Full path of the root directory of the project being built.
 * @param {string} saguiConfig.action Action: (develop, test, build)
 * @param {string[]} [saguiConfig.javaScript.buildDependencies = true] Which dependencies to transpile (Ex: ['ui-react-components'])
 * @param {boolean} [saguiConfig.optimize = false] Optimize the output (minify, dedup...)
 * @param {boolean} [saguiConfig.coverage = false] Outputs test coverage while running the tests
 * @param {string[]} [saguiConfig.pages = []] Define a build output based on a HTML and JS files.
 * @param {string[]} [saguiConfig.disabledLoaders = []] Disables loaders for specific file types.
 * @param {Object} [saguiConfig.webpack] Webpack configuration object to extend the internal configuration.
 * @param {Object} [saguiConfig.karma] Karma configuration object to extend the internal configuration.
 */
const sagui = (saguiConfig = {}) => {
  const finalSaguiConfig = {
    ...DEFAULT_SAGUI_CONFIG,
    ...saguiConfig,
    ...loadProjectSaguiConfig(saguiConfig)
  }

  const webpackConfig = configureWebpack(finalSaguiConfig)
  const karmaConfig = configureKarma(finalSaguiConfig, webpackConfig)

  return run(finalSaguiConfig, webpackConfig, karmaConfig)
}

/**
 * Command Line Interface
 */
sagui.cli = cli

export default sagui
