export function buildConfig ({ projectPath, webpackConfig }) {
  return {
    basePath: projectPath,

    frameworks: ['jasmine'],
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

    singleRun: true
  };
};
