import fileExtensions from '../file-extensions'

export default {
  name: 'babel',
  configure ({ enableCoverage }) {
    if (!enableCoverage) {
      return {}
    }

    return {
      module: {
        preLoaders: [
          {
            test: fileExtensions.JAVASCRIPT_SPEC,
            loader: 'isparta',
            exclude: /node_modules/
          }
        ]
      }
    }
  }
}
