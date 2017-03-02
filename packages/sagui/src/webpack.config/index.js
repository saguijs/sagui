import CleanWebpackPlugin from 'clean-webpack-plugin'
import istanbul from 'babel-plugin-istanbul'
import merge from 'webpack-merge'
import path from 'path'
import reactTransform from 'babel-plugin-react-transform'
import webpack, { DefinePlugin, HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack'
import WebpackMd5Hash from 'webpack-md5-hash'

import actions from '../actions'
import fileExtensions from '../file-extensions'

import buildLibraryConfig from './build-library-config'
import buildPagesConfig from './build-pages-config'

export default (saguiOptions = {}) => {
  const { pages = [], libraries = [], ...sharedOptions } = saguiOptions
  const sharedWebpackConfig = merge.smart(
    buildSharedWebpackConfig(sharedOptions),
    sharedOptions.webpack
  )

  return [
    ...(pages.length > 0 ? [buildPagesConfig(pages, sharedOptions)] : []),
    ...libraries.map((libraryConfig) => buildLibraryConfig(libraryConfig, sharedOptions))
  ].map((entryPointWebpackConfig) => merge.smart(
    sharedWebpackConfig,
    entryPointWebpackConfig
  ))
}

const buildSharedWebpackConfig = (saguiOptions) => {
  const { action, projectPath, saguiPath, watch, optimize, javaScript = {}, coverage } = saguiOptions

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
      ...(action === actions.BUILD ? [
        new WebpackMd5Hash()
      ] : []),

      // Use "OccurrenceOrderPlugin" in order to make build deterministic.
      // See https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95
      ...(action === actions.BUILD ? [
        new webpack.optimize.OccurrenceOrderPlugin(true)
      ] : []),

      // Duplicates equal or similar files
      ...(action === actions.BUILD ? [
        new WebpackMd5Hash()
      ] : []),

      new CleanWebpackPlugin(['dist'], {
        root: projectPath,
        verbose: false
      }),

      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],

    module: {
      loaders: [
        // fonts
        {
          test: fileExtensions.test.WOFF,
          loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
        },
        {
          test: fileExtensions.test.WOFF2,
          loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
        },
        {
          test: fileExtensions.test.TTF,
          loader: 'file?name=[name]-[hash].[ext]&mimetype=application/octet-stream'
        },
        {
          test: fileExtensions.test.EOT,
          loader: 'file?name=[name]-[hash].[ext]'
        },
        {
          test: fileExtensions.test.OTF,
          loader: 'file?name=[name]-[hash].[ext]'
        },

        // images
        {
          test: fileExtensions.test.IMAGE,
          loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
        },

        // javascript
        {
          test: fileExtensions.test.JAVASCRIPT,
          loader: 'babel',
          include: [
            path.join(projectPath, 'src'),

            // allow the user to explicit allow a dependency to be
            // transpiled by Babel
            //
            // by default node_modules is ignored
            ...(javaScript.transpileDependencies || []).map((dependency) => (
              path.join(projectPath, 'node_modules', dependency)
            ))
          ],
          query: {
            // enabling it breaks source maps
            compact: false
          }
        },

        // json
        {
          test: fileExtensions.test.JSON,
          loader: 'json-loader'
        },

        // txt
        {
          test: fileExtensions.test.TXT,
          loader: 'raw-loader'
        },

        // video
        {
          test: fileExtensions.test.VIDEO,
          loader: 'file?name=[name]-[hash].[ext]'
        },

        // yaml
        {
          test: fileExtensions.test.YAML,
          loader: 'json!yaml'
        }
      ]
    },

    resolve: {
      extensions: ['', ...fileExtensions.list.JAVASCRIPT],

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
    },

    eslint: {
      configFile: path.join(projectPath, '.eslintrc')
    },

    babel: {
      babelrc: path.join(projectPath, '.babelrc'),
      plugins: [
        ...(action === actions.DEVELOP ? [
          [reactTransform, {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }]
          }]
        ] : []),

        ...(action === actions.TEST_UNIT && coverage ? [
          [istanbul, {
            exclude: [
              '**/*.spec.*',
              '**/node_modules/**/*'
            ]
          }]
        ] : [])
      ]
    }
  }
}
