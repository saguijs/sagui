import developmentServer from './development-server'
import build from './build'
import test from './test'
import install from './install'
import lint from './lint'
import actions from '../actions'

export default (saguiOptions) => {
  switch (saguiOptions.action) {
    case actions.TEST:
      return test(saguiOptions)

    case actions.DEVELOP:
      return developmentServer(saguiOptions)

    case actions.BUILD:
      return build(saguiOptions)

    case actions.INSTALL:
      return install(saguiOptions)

    case actions.LINT:
      return lint(saguiOptions)

    default:
      return Promise.reject('A valid action is required.')
  }
}
