import { NoErrorsPlugin } from 'webpack'
import path from 'path'
import actions from '../../actions'
import fileExtensions from '../../file-extensions'

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

  return 'inline-source-map'
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
        extensions: fileExtensions.list.JAVASCRIPT,
        modules: [
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
        modules: [
          path.join(saguiPath, '/node_modules'),
          path.join(projectPath, '/node_modules')
        ]
      }
    }
  }
}
