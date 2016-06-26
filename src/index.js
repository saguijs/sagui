import path from 'path'
import cli from './cli'
import loadProjectConfig from './project-config'
import configureKarma from './karma'
import configureWebpack from './webpack'
import run from './runner'
import json from './util/json'
import fileExists from './util/file-exists'
import pipeline from './util/pipeline'

/**
 * Sagui
 *
 * This function takes a single sagui options object,
 * prepare all the required Webpack / Karma configurations
 * and execute the requested action.
 *
 * @param {Object} options Sagui options object
 * @param {string} options.projectPath Full path of the root directory of the project being built.
 * @param {string} options.buildTarget Target: (development, production, test).
 * @param {string} options.action Action: (develop, test, build)
 * @param {string[]} [options.javaScript.buildDependencies = true] Which dependencies to transpile (Ex: ['ui-react-components'])
 * @param {boolean} [options.hotReloading = true] Enable hot reloading
 * @param {boolean} [options.optimize = false] Optimize the output (minify, dedup...)
 * @param {boolean} [options.defineNodeEnv = true] Define and replace NODE_ENV environment in the code
 * @param {boolean} [options.clean = true] Clean the build directory
 * @param {boolean} [options.coverage = false] Outputs test coverage while running the tests
 * @param {boolean} [options.lint = true] Perform static analysis of the code through ESLint
 * @param {string[]} [options.pages = []] Define a build output based on a HTML and JS files.
 * @param {string[]} [options.disabledLoaders = []] Disables loaders for specific file types.
 * @param {Object} [options.webpack] Webpack configuration object to extend the internal configuration.
 * @param {Object} [options.karma] Karma configuration object to extend the internal configuration.
 */
const sagui = (options = {}) => {
  const saguiOptions = pipeline(
    sanityCheck,
    loadProjectConfig,
    configureWebpack,
    configureKarma
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

const DEFAULT_OPTIONS = {
  port: 3000,
  saguiPath: path.join(__dirname, '../'),
  hotReloading: true,
  optimize: false,
  defineNodeEnv: true,
  clean: true,
  coverage: false,
  lint: true,
  pages: [],
  disabledLoaders: [],
  javaScript: {},
  webpack: {},
  karma: {}
}

function sanityCheck (saguiOptions) {
  const { projectPath } = saguiOptions

  const packagePath = path.join(projectPath, 'package.json')
  if (!fileExists(packagePath)) throw new MissingPackageJSON()

  const packageJSON = json.read(packagePath)
  if (packageJSON.name === 'sagui') throw new SaguiPath()

  return saguiOptions
}

export function MissingPackageJSON () {
  this.name = 'MissingPackageJSON'
  this.message = 'Must be executed in target project\'s package.json path'
  this.stack = (new Error()).stack
}
MissingPackageJSON.prototype = Object.create(Error.prototype)
MissingPackageJSON.prototype.constructor = MissingPackageJSON

export function SaguiPath () {
  this.name = 'SaguiPath'
  this.message = 'Sagui CLI must not be run in Sagui\'s path'
  this.stack = (new Error()).stack
}
SaguiPath.prototype = Object.create(Error.prototype)
SaguiPath.prototype.constructor = SaguiPath
