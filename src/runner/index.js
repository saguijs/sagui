import KarmaServer from 'karma/lib/server'
import developmentServer from './development-server'
import build from './build'

export default (saguiOptions) => {
  switch (saguiOptions.action) {
    case 'test':
      return new KarmaServer(saguiOptions.karma).start()

    case 'develop':
      return developmentServer(saguiOptions)

    case 'build':
      return build(saguiOptions)
  }
}
