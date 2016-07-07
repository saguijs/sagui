import actions from '../actions'
import build from './build'
import developmentServer from './development-server'
import install from './install'
import lint from './lint'
import test from './test'
import typecheck from './typecheck'

export default (saguiOptions) => {
  switch (saguiOptions.action) {
    case actions.BUILD:
      return build(saguiOptions)

    case actions.DEVELOP:
      return developmentServer(saguiOptions)

    case actions.INSTALL:
      return install(saguiOptions)

    case actions.LINT:
      return lint(saguiOptions)

    case actions.TEST:
      return test(saguiOptions)

    case actions.TYPECHECK:
      return typecheck(saguiOptions)

    default:
      return Promise.reject('A valid action is required.')
  }
}
