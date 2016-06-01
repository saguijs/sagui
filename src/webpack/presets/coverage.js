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
            test: (absPath) => absPath.match(/\.(jsx?|es6)$/) && !absPath.match(/\.spec/),
            loader: 'isparta',
            exclude: /node_modules/
          }
        ]
      }
    }
  }
}
