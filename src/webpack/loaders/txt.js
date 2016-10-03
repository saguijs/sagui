import fileExtensions from '../../file-extensions'

export default {
  name: 'txt',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.test.TXT,
            loader: 'raw-loader'
          }
        ]
      }
    }
  }
}
