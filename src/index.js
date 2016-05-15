import * as actions from './actions'
import configure, { configureWebpack, configureKarma } from './configure'

export default {
  build (options) {
    const env = configure({ ...options, buildTarget: 'build' })
    actions.buildAndDistribute(env)
  },

  dist (options) {
    const env = configure({ ...options, buildTarget: 'dist' })
    actions.buildAndDistribute(env)
  },

  develop (options) {
    const env = configure({ ...options, buildTarget: 'develop' })
    actions.startDevelop(env)
  },

  test (options) {
    const env = configure({ ...options, buildTarget: 'test' })
    actions.runTest(env)
  },

  install (options) {
    const env = configure(options)
    actions.install(env)
  },

  configure,

  webpack: configureWebpack,
  karma: configureKarma
}

