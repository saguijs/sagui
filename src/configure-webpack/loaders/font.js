import fileExtensions from '../../file-extensions'

export default {
  name: 'font',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.test.WOFF,
            loader: 'file-loader?name=[name]-[hash].[ext]&mimetype=application/font-woff'
          },
          {
            test: fileExtensions.test.WOFF2,
            loader: 'file-loader?name=[name]-[hash].[ext]&mimetype=application/font-woff'
          },
          {
            test: fileExtensions.test.TTF,
            loader: 'file-loader?name=[name]-[hash].[ext]&mimetype=application/octet-stream'
          },
          {
            test: fileExtensions.test.EOT,
            loader: 'file-loader?name=[name]-[hash].[ext]'
          },
          {
            test: fileExtensions.test.OTF,
            loader: 'file-loader?name=[name]-[hash].[ext]'
          }
        ]
      }
    }
  }
}
