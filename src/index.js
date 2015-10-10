import buildWebpackConfig from './config/build-webpack-config'
import buildKarmaConfig from './config/build-karma-config'
import startDevelop from './action/start-develop'
import runTest from './action/run-test'
import install from './action/install'


export default {
  develop (env, options) {
    const webpackConfig = buildWebpackConfig(env, options)
    startDevelop(webpackConfig)
  },

  test (env, options) {
    const webpackConfig = buildWebpackConfig(env, options)
    const karmaConfig = buildKarmaConfig(env, options, webpackConfig)
    runTest(karmaConfig)
  },

  install (env, options) {
    install(env)
  }
}
