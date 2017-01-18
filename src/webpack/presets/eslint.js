import path from 'path'
import fileExtensions from '../../file-extensions'

export default {
  name: 'eslint',
  configure ({ watch, action, projectPath }) {
    return {
      module: {
        rules: [
          {
            test: fileExtensions.test.JAVASCRIPT,
            enforce: 'pre',
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
              configFile: path.join(projectPath, '.eslintrc')
            }
          }
        ]
      }
    }
  }
}
