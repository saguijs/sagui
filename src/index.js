import buildWebpackConfig from './config/build-webpack-config'
import buildKarmaConfig from './config/build-karma-config'
import startDevelop from './action/start-develop'
import runTest from './action/run-test'
import install from './action/install'
import json from './util/json'


export default {
  develop (env, options) {
    check(env)

    const webpackConfig = buildWebpackConfig(env, options)
    startDevelop(webpackConfig)
  },

  test (env, options) {
    check(env)

    const webpackConfig = buildWebpackConfig(env, options)
    const karmaConfig = buildKarmaConfig(env, options, webpackConfig)
    runTest(karmaConfig)
  },

  install (env, options) {
    check(env)

    install(env)
  }
}


function check (env) {
  const packageJSON = json.read(env.packagePath)
  if (packageJSON.name === 'sagui') throw new InvalidUsage()
}


export class InvalidUsage extends Error {
  constructor () {
    super()
    this.name = 'InvalidUsage'
  }
}
