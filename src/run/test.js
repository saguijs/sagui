import KarmaServer from 'karma/lib/server'

export default (karmaConfig) => new Promise((resolve, reject) => {
  new KarmaServer(karmaConfig, (exitCode) => {
    if (exitCode === 0) {
      resolve()
    } else {
      reject(exitCode)
    }
  }).start()
})
