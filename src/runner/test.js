import KarmaServer from 'karma/lib/server'

export default (saguiOptions) => {
  return new KarmaServer(saguiOptions.karma).start()
}
