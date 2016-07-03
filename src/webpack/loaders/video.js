import fileExtensions from '../../file-extensions'

export default {
  name: 'video',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.test.VIDEO,
            loader: 'file?name=[name]-[hash].[ext]'
          }
        ]
      }
    }
  }
}
