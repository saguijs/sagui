try {
  /**
   * Try loading the compiled code.
   */
  module.exports = require('./lib').default
} catch (e) {
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
