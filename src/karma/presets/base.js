export default {
  name: 'base',
  configure ({ projectPath }) {
    return {
      basePath: projectPath,

      files: [
        'src/**/*.spec.*',
        { pattern: 'src/**/*', watched: true, included: false }
      ],

      preprocessors: {
        // add webpack as preprocessor
        'src/**/*.spec.*': ['webpack', 'sourcemap']
      },

      webpackServer: {
        noInfo: true
      },

      singleRun: true,
      autoWatch: false
    }
  }
}
