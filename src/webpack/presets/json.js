export default {
  name: 'json',
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
