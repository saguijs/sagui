import webpack from 'webpack'

export default {
  name: 'optimize',
  configure ({ optimize }) {
    if (!optimize) {
      return {}
    }

    return {
      plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            // disable warning messages
            // since they are very verbose
            // and provide little value
            warnings: false
          }
        })
      ]
    }
  }
}
