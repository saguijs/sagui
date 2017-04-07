import CleanWebpackPlugin from 'clean-webpack-plugin'
import merge from 'webpack-merge'
import path from 'path'
import webpack, { DefinePlugin, HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack'
import WebpackMd5Hash from 'webpack-md5-hash'

import actions from '../actions'
import fileExtensions from '../file-extensions'

import buildLibraryConfig from './build-library-config'
import buildPagesConfig from './build-pages-config'
import buildLoadersConfig from './loaders'

/**
 * Takes a saguiConfig object and construct a webpack configuration object
 * It support two different types of archetypes; pages and libraries
 *
 * @return ready to use webpack configuration as an array
 */
export default (saguiConfig = {}) => {
  const { pages = [], libraries = [], ...sharedSaguiConfig } = saguiConfig

  const sharedWebpackConfig = merge.smart(
    buildSharedWebpackConfig(sharedSaguiConfig),
    buildLoadersConfig(sharedSaguiConfig),
    sharedSaguiConfig.webpack
  )

  return [
    ...(pages.length > 0 ? [buildPagesConfig(pages, sharedSaguiConfig)] : []),
    ...libraries.map((libraryConfig) => buildLibraryConfig(libraryConfig, sharedSaguiConfig))
  ].map((entryPointWebpackConfig) => merge.smart(
    sharedWebpackConfig,
    entryPointWebpackConfig
  ))
}

const buildSharedWebpackConfig = (saguiConfig) => {
  const { action, projectPath, saguiPath, watch, optimize } = saguiConfig

  const projectSourcePath = path.join(projectPath, 'src')

  return {
    context: projectSourcePath,

    devtool: action === actions.BUILD ? 'source-map' : 'inline-source-map',

    plugins: [
      // only throw errors while building if we are not
      // in development or with watch enabled
      ...(watch || action === actions.DEVELOP ? [] : [new NoErrorsPlugin()]),

      // only include the optimization plugins if
      // the flag is enabled
      ...(optimize ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            // disable warning messages
            // since they are very verbose
            // and provide little value
            warnings: false
          }
        })
      ] : []),

      // only enable hot module replacement in development
      ...(action === actions.DEVELOP ? [new HotModuleReplacementPlugin()] : []),

      // Due to an issue in Webpack, its chunkhashes aren't deterministic.
      // To ensure hashes are generated based on the file contents, use webpack-md5-hash plugin.
      ...(action === actions.BUILD ? [new WebpackMd5Hash()] : []),

      // Use "OccurrenceOrderPlugin" in order to make build deterministic.
      // See https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95
      ...(action === actions.BUILD ? [new webpack.optimize.OccurrenceOrderPlugin(true)] : []),

      // Duplicates equal or similar files
      ...(action === actions.BUILD ? [new WebpackMd5Hash()] : []),

      // We should not clean on any other action
      ...(action === actions.BUILD ? [new CleanWebpackPlugin(['dist'], {
        root: projectPath,
        verbose: false
      })] : []),

      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],

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
