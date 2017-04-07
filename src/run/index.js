import actions from '../actions'
import build from './build'
import developmentServer from './development-server'
import install from './install'
import lint from './lint'
import test from './test'
import typecheck from './typecheck'

export default (saguiConfig, webpackConfig, karmaConfig) => {
  switch (saguiConfig.action) {
    case actions.BUILD:
      return build(saguiConfig, webpackConfig)

    case actions.DEVELOP:
      return developmentServer(saguiConfig, webpackConfig)

    case actions.UPDATE:
      return install(saguiConfig)

    case actions.TEST_LINT:
      return lint(saguiConfig)

    case actions.TEST_UNIT:
      return test(karmaConfig)

    case actions.TEST_TYPECHECK:
      return typecheck(saguiConfig)

    default:
      return Promise.reject(new Error('A valid action is required.'))
  }
}
