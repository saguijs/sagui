export default {
  name: 'webpack-videos',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: /\.(ogg|mp4)$/,
            loader: 'file?name=[name]-[hash].[ext]'
          }
        ]
      }
    }
  }
}
