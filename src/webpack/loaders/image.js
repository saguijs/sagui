import fileExtensions from '../../file-extensions'
import actions from '../../actions'

export default {
  name: 'image',
  configure ({ action }) {
    // User null-loader during tests
    // for better performance
    const loader = action === actions.TEST
      ? 'null-loader'
      : 'url-loader?limit=8192&name=[name]-[hash].[ext]'

    return {
      module: {
        loaders: [
          {
            test: fileExtensions.test.IMAGE,
            loader
          }
        ]
      }
    }
  }
}
