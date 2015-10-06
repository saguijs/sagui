import path from 'path'


export function buildConfig ({ projectPath, saguiPath, webpackConfig, watch }) {
  return {
    basePath: projectPath,

    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],

    files: [
      // shim to workaroud PhantomJS 1.x lack of `bind` support
      // see: https://github.com/ariya/phantomjs/issues/10522
      path.join(saguiPath, 'node_modules/es5-shim/es5-shim.js'),

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
}
