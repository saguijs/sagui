import { join } from 'path'
import { statSync } from 'fs'
import buildWebpackConfig from './config/build-webpack-config'
import buildKarmaConfig from './config/build-karma-config'
import startDevelop from './action/start-develop'
import runTest from './action/run-test'
import install from './action/install'
import build from './action/build'
import json from './util/json'


export default {
  build (env, options) {
    const envWithConfig = loadProjectConfig(env)
    envWithConfig.buildTarget = 'develop'

    const webpackConfig = buildWebpackConfig(envWithConfig, options)
    build(webpackConfig)
  },

  develop (env, options) {
    const envWithConfig = loadProjectConfig(env)
    envWithConfig.buildTarget = 'develop'

    const webpackConfig = buildWebpackConfig(envWithConfig, options)
    startDevelop(webpackConfig)
  },

  test (env, options) {
    const envWithConfig = loadProjectConfig(env)
    envWithConfig.buildTarget = 'test'

    const webpackConfig = buildWebpackConfig(envWithConfig, options)
    const karmaConfig = buildKarmaConfig(envWithConfig, options, webpackConfig)
    runTest(karmaConfig)
  },

  install (env, options) {
    const envWithConfig = loadProjectConfig(env)

    install(envWithConfig.projectPath)
  }
}


function loadProjectConfig (env) {
  const packagePath = join(env.projectPath, 'package.json')
  if (!fileExists(packagePath)) throw new InvalidUsage()

  const packageJSON = json.read(packagePath)
  if (packageJSON.name === 'sagui') throw new InvalidUsage()
  return Object.assign({}, env, packageJSON.sagui || {})
}


function fileExists (file) {
  try {
    statSync(file)
    return true
  } catch (e) {
    return false
  }
}


export class InvalidUsage extends Error {
  constructor () {
    super()
    this.name = 'InvalidUsage'
  }
}
