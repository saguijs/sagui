import path from 'path'

export default {
  name: 'eslint',
  configure ({ projectPath, enableCoverage }) {
    if (!enableCoverage) {
      return {}
    }

    return {
      eslint: {
        configFile: path.join(projectPath, '.eslintrc')
      },

      module: {
        preLoaders: [
          {
            test: /\.jsx?$/,
            loader: 'eslint',
            exclude: /node_modules/
          }
        ]
      }
    }
  }
}
