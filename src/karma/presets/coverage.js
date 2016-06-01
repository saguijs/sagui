import path from 'path'

export default {
  name: 'coverage',
  configure ({ projectPath }) {
    return {
      reporters: ['coverage', 'mocha'],
      coverageReporter: {
        dir: path.join(projectPath, 'coverage'),
        reporters: [
          { type: 'html', subdir: 'html' }
        ]
      }
    }
  }
}
