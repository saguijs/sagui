export default {
  name: 'base',
  configure ({ projectPath, watch }) {
    return {
      basePath: projectPath,

      files: [
        'src/**/*.spec.*',
        { pattern: 'src/**/*', watched: true, included: false }
      ],

      preprocessors: {
        // add webpack as preprocessor
        'src/**/*.spec.*': ['webpack']
      },

      webpackServer: {
        noInfo: true
      },

      singleRun: !watch,
      autoWatch: watch
    }
  }
}
