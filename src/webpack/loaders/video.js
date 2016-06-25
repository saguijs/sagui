import fileExtensions from '../../file-extensions'

export default {
  name: 'video',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.VIDEO,
            loader: 'file?name=[name]-[hash].[ext]'
          }
        ]
      }
    }
  }
}
