export default {
  name: 'webpack-json',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: /\.(json)$/,
            loader: 'json-loader'
          }
        ]
      }
    }
  }
}
