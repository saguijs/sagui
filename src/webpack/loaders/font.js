import fileExtensions from '../../file-extensions'

export default {
  name: 'font',
  configure () {
    return {
      module: {
        rules: [
          {
            test: fileExtensions.test.WOFF,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name]-[hash].[ext]',
                  mimetype: 'application/font-woff'
                }
              }
            ]
          },
          {
            test: fileExtensions.test.WOFF2,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name]-[hash].[ext]',
                  mimetype: 'application/font-woff'
                }
              }
            ]
          },
          {
            test: fileExtensions.test.EOT,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name]-[hash].[ext]'
                }
              }
            ]
          },
          {
            test: fileExtensions.test.TTF,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name]-[hash].[ext]',
                  mimetype: 'application/octet-stream'
                }
              }
            ]
          },
          {
            test: fileExtensions.test.OTF,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name]-[hash].[ext]'
                }
              }
            ]
          }
        ]
      }
    }
  }
}
