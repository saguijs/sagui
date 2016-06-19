import { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack'
import path from 'path'
import buildTargets from '../../build-targets'

export default {
  name: 'base',
  configure ({ buildTarget, projectPath, saguiPath }) {
    const modulesDirectories = [
      path.join(projectPath, '/node_modules'),
      path.join(saguiPath, '/node_modules')
    ]
    const projectSourcePath = path.join(projectPath, 'src')

    return {
      context: projectSourcePath,

      devtool: 'source-map',

      plugins: buildPlugins(buildTarget),

      resolve: {
        extensions: ['', '.js', '.jsx', '.es6'],
        root: [
          ...modulesDirectories,
          projectSourcePath
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
