import CleanWebpackPlugin from 'clean-webpack-plugin'
import istanbul from 'babel-plugin-istanbul'
import merge from 'webpack-merge'
import path from 'path'
import reactTransform from 'babel-plugin-react-transform'
import webpack, { DefinePlugin, HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack'
import WebpackMd5Hash from 'webpack-md5-hash'

import actions from './actions'

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
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file?name=[name]-[hash].[ext]&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file?name=[name]-[hash].[ext]&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file?name=[name]-[hash].[ext]'
        },
        {
          test: /\.(otf)$/,
          loader: 'file?name=[name]-[hash].[ext]'
        },

        // images
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
        },

        // javascript
        {
          test: /\.(jsx?|es6)$/,
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
          test: /\.(json)$/,
          loader: 'json-loader'
        },

        // txt
        {
          test: /\.(txt)$/,
          loader: 'raw-loader'
        },

        // video
        {
          test: /\.(ogg|mp4)$/,
          loader: 'file?name=[name]-[hash].[ext]'
        },

        // yaml
        {
          test: /\.(yml|yaml)$/,
          loader: 'json!yaml'
        }
      ]
    },

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
