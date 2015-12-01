import path from 'path'
import { HotModuleReplacementPlugin, optimize } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import reactTransform from 'babel-plugin-react-transform'


const defaultPages = ['index']


export default function buildWebpackConfig ({ projectPath, saguiPath, pages = defaultPages }, { watch }) {
  const modulesDirectories = [
    path.join(projectPath, '/node_modules'),
    path.join(saguiPath, '/node_modules')
  ]

  const entry = buildEntryConfig(pages)
  const plugins = buildPluginsConfig(pages)

  return {
    context: projectPath,

    eslint: {
      configFile: path.join(saguiPath, '.eslintrc'),
      failOnError: !watch
    },

    entry,
    plugins,

    resolve: { root: modulesDirectories },
    resolveLoader: { modulesDirectories },

    output: {
      path: path.join(projectPath, 'dist'),
      filename: '[name]-[hash].js',
      chunkFilename: '[id].bundle.js'
    },

    babel: {
      optional: ['runtime'],
      stage: 0,
      env: {
        development: {
          plugins: [reactTransform],
          extra: {
            'react-transform': {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }]
            }
          }
        }
      }
    },

    module: {
      preLoaders: [
        {
          test: /(\.js)|(\.jsx)$/,
          loader: 'eslint',
          exclude: /node_modules/
        }
      ],

      loaders: [
        {
          test: /\.(json)$/,
          loader: 'json-loader'
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
        },
        {
          test: /\.scss$/,
          // Query parameters are passed to node-sass
          loader: 'style!css!resolve-url!sass?sourceMap&outputStyle=expanded&' +
            'includePaths[]=' + (path.resolve(projectPath, './node_modules'))
        },
        {
          test: /\.(ttf|eot|woff|svg)$/,
          loader: 'file?name=[name]-[hash].[ext]'
        },
        {
          test: /(\.js)|(\.jsx)$/,
          exclude: /node_modules/,
          loader: 'babel'
        }
      ]
    }
  }
}


function buildEntryConfig (pages) {
  const hotMiddleware = 'webpack-hot-middleware/client'

  let entry = {}
  pages.forEach(page => {
    entry[page] = [`./src/${page}`, hotMiddleware]
  })

  return entry
}


function buildPluginsConfig (pages) {
  let plugins = [
    new HotModuleReplacementPlugin(),
    new optimize.CommonsChunkPlugin({ name: 'common' })
  ]

  pages.forEach(page => {
    plugins.push(new HtmlWebpackPlugin({
      template: `src/${page}.html`,
      filename: `${page}.html`,
      chunks: ['common', page],
      inject: true
    }))
  })

  return plugins
}
