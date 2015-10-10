import path from 'path'
import fs from 'fs'


export default function buildKarmaConfig ({ projectPath, saguiPath }, { watch }, webpackConfig) {
  return {
    basePath: projectPath,

    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],

    files: [
      getShimPath({ projectPath, saguiPath }),
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


/**
  Shim to workaroud PhantomJS 1.x lack of `bind` support
  see: https://github.com/ariya/phantomjs/issues/10522

  Helper function to load the shim if the module is installed in NPM3 or NPM2
  NPM 3 has a flatter node_modules folder.
 */
function getShimPath ({ projectPath, saguiPath }) {
  const npm2Path = path.join(saguiPath, 'node_modules/es5-shim/es5-shim.js')
  const npm3Path = path.join(projectPath, 'node_modules/es5-shim/es5-shim.js')

  try {
    fs.lstatSync(npm3Path)
    return npm3Path
  } catch (error) {
    if (error.code === 'ENOENT') { return npm2Path }
    throw error
  }
}
