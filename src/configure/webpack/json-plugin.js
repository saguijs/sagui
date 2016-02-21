export default function jsonPlugin () {
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
