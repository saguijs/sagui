import path from 'path'

export default {
  name: 'eslint',
  configure ({ projectPath }) {
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
