import fileExtensions from '../../file-extensions'

export default {
  name: 'font',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.test.WOFF,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
          },
          {
            test: fileExtensions.test.WOFF2,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
          },
          {
            test: fileExtensions.test.TTF,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/octet-stream'
          },
          {
            test: fileExtensions.test.EOT,
            loader: 'file?name=[name]-[hash].[ext]'
          }
        ]
      }
    }
  }
}
