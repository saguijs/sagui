import path from 'path'
import fileExtensions from '../../file-extensions'

export default {
  name: 'eslint',
  configure ({ watch, action, projectPath }) {
    return {
      eslint: {
        configFile: path.join(projectPath, '.eslintrc')
      },

      module: {
        preLoaders: [
          {
            test: fileExtensions.test.JAVASCRIPT,
            loader: 'eslint-loader',
            exclude: /node_modules/
          }
        ]
      }
    }
  }
}
