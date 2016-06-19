import developmentServer from './development-server'
import build from './build'
import test from './test'
import install from './install'

export default (saguiOptions) => {
  switch (saguiOptions.action) {
    case 'test':
      return test(saguiOptions)

    case 'develop':
      return developmentServer(saguiOptions)

    case 'build':
      return build(saguiOptions)

    case 'install':
      return install(saguiOptions)
  }
}
