try {
  /**
   * Try loading the compiled code.
   */
  module.exports = require('./lib').default
} catch (e) {
  console.log('Unable to load compiled code.')
  console.log(e)
  console.log('Attempting to load source.')

  /**
   * If the compiled code is not available,
   * load from source.
   */
  try {
    require('babel-register')({
      only: /(sagui\/src)/
    })

    module.exports = require('./src').default
  } catch (e) {
    throw e
  }
}
