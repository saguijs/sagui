import fileExtensions from '../../file-extensions'

export default {
  name: 'babel',
  configure ({ coverage }) {
    if (!coverage) {
      return {}
    }

    return {
      module: {
        preLoaders: [
          {
            test: (absPath) => absPath.match(fileExtensions.pattern.JAVASCRIPT) && !absPath.match(/\.spec/),
            loader: 'isparta',
            exclude: /node_modules/
          }
        ]
      }
    }
  }
}
