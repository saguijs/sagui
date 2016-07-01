import fileExtensions from '../../file-extensions'

export default {
  name: 'font',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.pattern.WOFF,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
          },
          {
            test: fileExtensions.pattern.WOFF2,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
          },
          {
            test: fileExtensions.pattern.TTF,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/octet-stream'
          },
          {
            test: fileExtensions.pattern.EOT,
            loader: 'file?name=[name]-[hash].[ext]'
          }
        ]
      }
    }
  }
}
