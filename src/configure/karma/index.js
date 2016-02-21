export default function configureKarma (config) {
  const { projectPath, watch, webpackConfig, karmaConfig: userKarmaConfig } = config

  const defaultKarmaConfig = {
    basePath: projectPath,

    frameworks: ['jasmine', 'phantomjs-shim', 'sinon'],
    browsers: ['PhantomJS'],

    files: [
      'src/**/*.spec.*',
      { pattern: 'src/**/*', watched: true, included: false }
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.spec.*': ['webpack']
    },

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    },

    singleRun: !watch,

    autoWatch: watch
  }

  const karmaConfig = { ...defaultKarmaConfig, ...userKarmaConfig }

  return { ...config, karmaConfig }
}
