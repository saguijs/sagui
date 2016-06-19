import KarmaServer from 'karma/lib/server'

export default (saguiOptions) => new Promise((resolve, reject) => {
  new KarmaServer(saguiOptions.karma, (exitCode) => {
    if (exitCode === 0) {
      resolve()
    } else {
      reject(exitCode)
    }
  }).start()
})
