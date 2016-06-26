import fileExtensions from '../../file-extensions'

export default {
  name: 'font',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.WOFF,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
          },
          {
            test: fileExtensions.WOFF2,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
          },
          {
            test: fileExtensions.TTF,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/octet-stream'
          },
          {
            test: fileExtensions.EOT,
            loader: 'file?name=[name]-[hash].[ext]'
          }
        ]
      }
    }
  }
}
