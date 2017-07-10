import CleanWebpackPlugin from 'clean-webpack-plugin'
import merge from 'webpack-merge'
import path from 'path'
import webpack, { DefinePlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack'
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
    buildSharedWebpackConfig(saguiConfig),
    buildLoadersConfig(saguiConfig),
    sharedSaguiConfig.additionalWebpackConfig
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

    target: 'web',

    devtool: action === actions.BUILD ? 'source-map' : 'inline-source-map',

    plugins: [
      // only throw errors while building if we are not
      // in development or with watch enabled
      ...(watch || action === actions.DEVELOP ? [] : [new NoEmitOnErrorsPlugin()]),

      // only include the optimization plugins if
      // the flag is enabled
      ...(optimize ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),

        // signal loaders to minimize
        // https://webpack.js.org/guides/migrating/#uglifyjsplugin-minimize-loaders
        new webpack.LoaderOptionsPlugin({
          minimize: true
        })
      ] : []),

      // only enable hot module replacement in development
      ...(action === actions.DEVELOP ? [new HotModuleReplacementPlugin()] : []),

      // Due to an issue in Webpack, its chunkhashes aren't deterministic.
      // To ensure hashes are generated based on the file contents, use webpack-md5-hash plugin.
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

    // In wepback 2 builtin node.js modules take precedence over the normal modules
    // So, if a user creates a `constants` module and tries to require it
    // with `import 'constants'`, the node.js module will be imported instead
    //
    // This configuration disables this behavior
    // More information: https://github.com/webpack/webpack/issues/4666#issuecomment-292700060
    node: {
      constants: false
    },

    resolve: {
      extensions: fileExtensions.list.JAVASCRIPT,
      modules: [
        // Keep same behavior as Node.js module resolution:
        // - Precedence: `node_modules` win over `src`;
        // - Scan modules by looking through the current directory and its ancestors.
        'node_modules',

        projectSourcePath,

        // Sagui node_modules is required in the path to be able
        // to load the `webpack-hot-middleware`
        path.join(saguiPath, '/node_modules')
      ]
    },

    resolveLoader: {
      // Should first try to resolve loaders nested within Sagui.
      modules: [
        path.join(saguiPath, '/node_modules'),
        path.join(projectPath, '/node_modules')
      ]
    }
  }
}
