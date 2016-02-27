import { HotModuleReplacementPlugin, optimize } from 'webpack'
import path from 'path'

export default {
  name: 'base',
  configure ({ buildTarget, projectPath, saguiPath }) {
    const modulesDirectories = [
      path.join(projectPath, '/node_modules'),
      path.join(saguiPath, '/node_modules')
    ]

    return {
      context: path.join(projectPath, 'src'),

      devtool: 'source-map',

      plugins: buildPlugins(buildTarget),

      resolve: { root: modulesDirectories },
      resolveLoader: { modulesDirectories },

      output: {
        path: path.join(projectPath, 'dist')
      }
    }
  }
}

function buildPlugins (buildTarget) {
  let plugins = []

  if (buildTarget === 'develop') {
    plugins.push(new HotModuleReplacementPlugin())
  }

  if (buildTarget === 'dist') {
    plugins.push(new optimize.UglifyJsPlugin())
  }

  return plugins
}
