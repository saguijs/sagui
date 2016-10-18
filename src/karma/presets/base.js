export default {
  name: 'base',
  configure ({ projectPath, watch }) {
    return {
      basePath: projectPath,

      // we don't watch any of the files here,
      // since that is taken care by the preprocessors
      files: [
        { pattern: 'node_modules/sagui/karma-static-files/test-bundle.js', watched: false },
        { pattern: 'src/**/*', watched: false, included: false }
      ],

      preprocessors: {
        // add webpack as preprocessor
        'node_modules/sagui/karma-static-files/test-bundle.js': ['webpack', 'sourcemap']
      },

      webpackServer: {
        noInfo: true
      },

      singleRun: !watch,
      autoWatch: watch
    }
  }
}
