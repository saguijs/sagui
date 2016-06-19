import fileExtensions from '../../file-extensions'

export default {
  name: 'json',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.JSON,
            loader: 'json-loader'
          }
        ]
      }
    }
  }
}
