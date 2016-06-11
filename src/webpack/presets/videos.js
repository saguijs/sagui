import fileExtensions from '../file-extensions'

export default {
  name: 'videos',
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
