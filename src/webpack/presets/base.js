import { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack'
import path from 'path'
import buildTargets from '../../build-targets'

export default {
  name: 'base',
  configure ({ buildTarget, projectPath, saguiPath }) {
    const projectSourcePath = path.join(projectPath, 'src')

    return {
      context: projectSourcePath,

      devtool: 'source-map',

      plugins: buildPlugins(buildTarget),

      resolve: {
        extensions: ['', '.js', '.jsx', '.es6'],
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

function buildPlugins (buildTarget) {
  const plugins = [
    // prevent assets emitted that include errors
    new NoErrorsPlugin()
  ]

  if (buildTarget === buildTargets.DEVELOPMENT) {
    plugins.push(new HotModuleReplacementPlugin())
  }

  return plugins
}
