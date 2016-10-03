import { NoErrorsPlugin } from 'webpack'
import path from 'path'
import actions from '../../actions'

/**
 * Configure a proper devtool that best suits
 * a specific action we want to perform
 *
 * see: http://webpack.github.io/docs/configuration.html#devtool
 */
const devtool = (action) => {
  // generate the actual source map files on build
  if (action === actions.BUILD) {
    return 'source-map'
  }

  if (action === actions.TEST) {
    return 'inline-source-map'
  }

  // Use a much faster cheap-module-eval-source-map setup when possible
  return 'cheap-module-eval-source-map'
}

export default {
  name: 'base',
  configure ({ action, projectPath, saguiPath, watch }) {
    const projectSourcePath = path.join(projectPath, 'src')

    return {
      context: projectSourcePath,

      devtool: devtool(action),

      plugins: watch || action === actions.DEVELOP ? [] : [new NoErrorsPlugin()],

      resolve: {
        extensions: [''],

        root: [
          path.join(projectPath, '/node_modules'),
          projectSourcePath,

          // Sagui node_modules is required in the path to be able
          // to load the `webpack-hot-middleware`
          path.join(saguiPath, '/node_modules')
        ]
      },
      resolveLoader: {
        // Should first try to resolve loaders nested within Sagui.
        // This fixes an issue in NPM v2 where webpack incorrectly
        // thinks that the package `eslint` is the `eslint-loader`
        modulesDirectories: [
          path.join(saguiPath, '/node_modules'),
          path.join(projectPath, '/node_modules')
        ]
      }
    }
  }
}
