export default {
  name: 'fonts',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
          },
          {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file?name=[name]-[hash].[ext]&mimetype=application/octet-stream'
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file?name=[name]-[hash].[ext]'
          }
        ]
      }
    }
  }
}
