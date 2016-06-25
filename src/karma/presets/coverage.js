import path from 'path'

export default {
  name: 'coverage',
  configure ({ projectPath, coverage }) {
    if (!coverage) {
      return {}
    }

    return {
      reporters: ['coverage'],
      coverageReporter: {
        dir: path.join(projectPath, 'coverage'),
        reporters: [
          { type: 'html', subdir: 'html' },

          // outputs the coverage report in the console
          { type: 'text' }
        ]
      }
    }
  }
}
