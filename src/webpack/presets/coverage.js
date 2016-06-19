import fileExtensions from '../../file-extensions'

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
            test: (absPath) => absPath.match(fileExtensions.JAVASCRIPT) && !absPath.match(/\.spec/),
            loader: 'isparta',
            exclude: /node_modules/
          }
        ]
      }
    }
  }
}
