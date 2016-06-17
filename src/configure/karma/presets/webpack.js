/**
 * there can be multiple webpack configurations
 * and although harmless to have them all running the tests
 * it is not required and only produces double execution
 */
export default {
  name: 'webpack',
  configure ({ webpack }) {
    return {
      webpack: Array.isArray(webpack) ? webpack[0] : webpack
    }
  }
}
