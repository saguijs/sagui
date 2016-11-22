import KarmaServer from 'karma/lib/server'

export default (saguiOptions) => new Promise((resolve, reject) => {
  process.env.NODE_ENV = 'test'

  new KarmaServer(saguiOptions.karma, (exitCode) => {
    if (exitCode === 0) {
      resolve()
    } else {
      reject(exitCode)
    }
  }).start()
})
