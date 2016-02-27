import { optimize } from 'webpack'

export default {
  name: 'webpack-commons-chunk',
  configure ({ buildTarget }) {
    // Karma has an issue with the CommonsChunk plugin
    // see: https://github.com/webpack/karma-webpack/issues/24
    if (buildTarget === 'test') { return {} }

    return {
      plugins: [
        new optimize.CommonsChunkPlugin({ name: 'common' })
      ]
    }
  }
}
