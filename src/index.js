import startDevelop from './action/start-develop'
import runTest from './action/run-test'
import install from './action/install'
import buildAndDistribute from './action/build-and-distribute'

import buildEnv from './env'

export default {
  build (options) {
    const { webpackConfig } = buildEnv({ ...options, buildTarget: 'build' })
    buildAndDistribute(webpackConfig)
  },

  dist (options) {
    const { webpackConfig } = buildEnv({ ...options, buildTarget: 'dist' })
    buildAndDistribute(webpackConfig)
  },

  develop (options) {
    const { webpackConfig } = buildEnv({ ...options, buildTarget: 'develop' })
    startDevelop(webpackConfig)
  },

  test (options) {
    const { karmaConfig } = buildEnv({ ...options, buildTarget: 'test' })
    runTest(karmaConfig)
  },

  install (options) {
    const { projectPath } = buildEnv({ ...options, buildTarget: 'test' })
    install(projectPath)
  }
}

