import path from 'path'
import fileExtensions from '../../file-extensions'

export default {
  name: 'eslint',
  configure ({ action, projectPath, coverage }) {
    // We need to disable linting when generating coverage because the code is instrumented
    // and therefore it's not following the linting rules anymore.
    if (coverage) {
      return {}
    }

    return {
      eslint: {
        configFile: path.join(projectPath, '.eslintrc'),
        rules: action === 'develop' ? {
          'no-debugger': 0 // 0 => "off"
        } : {}
      },

      module: {
        preLoaders: [
          {
            test: fileExtensions.JAVASCRIPT,
            loader: 'eslint',
            exclude: /node_modules/
          }
        ]
      }
    }
  }
}
