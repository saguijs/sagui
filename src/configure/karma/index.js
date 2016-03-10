export default function configureKarma (config) {
  const { projectPath, watch, webpackConfig, karmaConfig: userKarmaConfig } = config

  const defaultKarmaConfig = {
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
    webpack: webpackConfig[0],

    webpackServer: {
      noInfo: true
    },

    singleRun: !watch,

    autoWatch: watch
  }

  const karmaConfig = { ...defaultKarmaConfig, ...userKarmaConfig }

  return { ...config, karmaConfig }
}
