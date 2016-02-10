import startDevelop from './action/start-develop'
import runTest from './action/run-test'
import install from './action/install'
import buildAndDistribute from './action/build-and-distribute'

import plugins from './plugins'

export default {
  build (options) {
    const { webpackConfig } = plugins({ ...options, buildTarget: 'build' })
    buildAndDistribute(webpackConfig)
  },

  dist (options) {
    const { webpackConfig } = plugins({ ...options, buildTarget: 'dist' })
    buildAndDistribute(webpackConfig)
  },

  develop (options) {
    const { webpackConfig } = plugins({ ...options, buildTarget: 'develop' })
    startDevelop(webpackConfig)
  },

  test (options) {
    const { karmaConfig } = plugins({ ...options, buildTarget: 'test' })
    runTest(karmaConfig)
  },

  install (options) {
    const { projectPath } = plugins({ ...options, buildTarget: 'test' })
    install(projectPath)
  }
}

