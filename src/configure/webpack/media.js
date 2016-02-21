export default {
  name: 'webpack-media',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
          }
        ]
      }
    }
  }
}
