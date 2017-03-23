import webpack from 'webpack'
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'

export default {
  name: 'optimize',
  configure ({ optimize }) {
    if (!optimize) {
      return {}
    }

    return {
      plugins: [
        new webpack.optimize.DedupePlugin(),
        new ParallelUglifyPlugin({})
      ]
    }
  }
}
