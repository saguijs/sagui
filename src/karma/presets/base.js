export default {
  name: 'base',
  configure ({ projectPath, watch }) {
    return {
      basePath: projectPath,

      files: [
        { pattern: 'node_modules/sagui/karma-static-files/test-bundle.js', watched: false },
        { pattern: 'src/**/*', watched: true, included: false }
      ],

      preprocessors: {
        // add webpack as preprocessor
        'node_modules/sagui/karma-static-files/test-bundle.js': ['webpack']
      },

      webpackServer: {
        noInfo: true
      },

      singleRun: !watch,
      autoWatch: watch
    }
  }
}
