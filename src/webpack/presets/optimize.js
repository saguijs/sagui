import webpack from 'webpack'
import WebpackMd5Hash from 'webpack-md5-hash'

export default {
  name: 'optimize',
  configure ({ optimize }) {
    if (!optimize) {
      return {}
    }

    return {
      plugins: [
        // Due to an issue in Webpack, its chunkhashes aren't deterministic.
        // To ensure hashes are generated based on the file contents, use webpack-md5-hash plugin.
        new WebpackMd5Hash(),
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
