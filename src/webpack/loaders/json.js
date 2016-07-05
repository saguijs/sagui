import fileExtensions from '../../file-extensions'

export default {
  name: 'json',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.test.JSON,
            loader: 'json-loader'
          }
        ]
      }
    }
  }
}
