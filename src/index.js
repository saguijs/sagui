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
  saguiPath: path.join(__dirname, '../'),
  optimize: false,
  coverage: false,
  pages: [],
  disableLoaders: [],
  javaScript: {},
  additionalWebpackConfig: {},
  additionalKarmaConfig: {}
}

/**
 * Sagui
 *
 * This function takes a single sagui config object,
 * prepare all the required Webpack / Karma configurations
 * and execute the requested action.
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
