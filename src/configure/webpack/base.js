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
      context: projectPath,

      devtool: 'source-map',

      plugins: buildPlugins(buildTarget),

      resolve: { root: modulesDirectories },
      resolveLoader: { modulesDirectories },

      output: {
        path: path.join(projectPath, 'dist'),
        filename: '[name]-[hash].js',
        chunkFilename: '[id].bundle.js'
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

  if (buildTarget !== 'test') {
    plugins.push(new optimize.CommonsChunkPlugin({ name: 'common' }))
  }

  return plugins
}
