import path from 'path'
import fileExtensions from '../../file-extensions'
import actions from '../../actions'

export default {
  name: 'eslint',
  configure ({ watch, action, projectPath }) {
    // we ignore debugger warning on any developer driven environment
    // such as running the development server or any "watch" (such as test watch)
    const ignoreDebugger = watch || action === actions.DEVELOP

    return {
      eslint: {
        configFile: path.join(projectPath, '.eslintrc'),
        rules: ignoreDebugger ? {
          'no-debugger': 0 // 0 => "off"
        } : {}
      },

      module: {
        preLoaders: [
          {
            test: fileExtensions.test.JAVASCRIPT,
            loader: 'eslint',
            exclude: /node_modules/
          }
        ]
      }
    }
  }
}
