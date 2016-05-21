export default ({ projectPath } = {}) => (karma, webpack) => (config) => {
  config.set({
    basePath: projectPath,

    frameworks: ['jasmine', 'sinon'],
    browsers: ['PhantomJS'],
    reporters: ['mocha'],

    files: [
      'src/**/*.spec.*',
      { pattern: 'src/**/*', watched: true, included: false }
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.spec.*': ['webpack']
    },

    // there can be multiple archetypes configured
    // and althought harmless to have them all running the tests
    // it is not required and only produces double execution
    webpack: webpack[0],

    webpackServer: {
      noInfo: true
    },

    singleRun: true,
    autoWatch: false,

    // extend with user configuration
    ...karma
  })
}
