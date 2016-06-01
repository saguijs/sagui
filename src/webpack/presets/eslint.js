import path from 'path'

export default {
  name: 'eslint',
  configure ({ projectPath, enableCoverage }) {
    // We need to disable linting when generating coverage because the code is instrumented
    // and therefore it's not following the linting rules anymore.
    if (enableCoverage) {
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
