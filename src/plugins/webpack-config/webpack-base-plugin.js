import { HotModuleReplacementPlugin, optimize } from 'webpack'
import merge from 'webpack-merge'
import path from 'path'

export default function scssPlugin (env) {
  const {
    buildTarget,
    projectPath,
    saguiPath,
    webpackConfig: base
  } = env

  const modulesDirectories = [
    path.join(projectPath, '/node_modules'),
    path.join(saguiPath, '/node_modules')
  ]

  const webpackConfig = merge(base, {
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
  })

  return { ...env, webpackConfig }
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
