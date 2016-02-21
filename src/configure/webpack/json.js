export default function () {
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
