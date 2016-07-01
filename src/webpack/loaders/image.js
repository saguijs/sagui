import fileExtensions from '../../file-extensions'

export default {
  name: 'image',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.test.IMAGE,
            loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
          }
        ]
      }
    }
  }
}
