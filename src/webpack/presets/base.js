import { HotModuleReplacementPlugin, NoErrorsPlugin, optimize } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import path from 'path'

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

      plugins: buildPlugins(buildTarget, projectPath),

      resolve: {
        extensions: ['', '.js', '.jsx', '.es6'],
        root: [
          ...modulesDirectories,
          projectSourcePath
        ]
      },
      resolveLoader: { modulesDirectories }
    }
  }
}

function buildPlugins (buildTarget, projectPath) {
  let plugins = [
    // prevent assets emitted that include errors
    new NoErrorsPlugin(),

    new CleanWebpackPlugin(['build'], {
      root: projectPath,
      verbose: false
    })
  ]

  if (buildTarget === 'development') {
    plugins.push(new HotModuleReplacementPlugin())
  }

  if (buildTarget === 'production') {
    plugins.push(new optimize.DedupePlugin())

    plugins.push(new optimize.UglifyJsPlugin({
      compress: {
        // disable warning messages
        // since they are very verbose
        // and provide little value
        warnings: false
      }
    }))
  }

  return plugins
}
