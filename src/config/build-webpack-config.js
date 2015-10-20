import path from 'path'
import { HotModuleReplacementPlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import reactTransform from 'babel-plugin-react-transform'


export default function buildWebpackConfig ({ projectPath, saguiPath }, { watch }) {
  return {
    context: projectPath,

    eslint: {
      configFile: path.join(saguiPath, '.eslintrc'),
      failOnError: !watch
    },

    entry: [
      'webpack-hot-middleware/client',
      './src/index'
    ],

    resolve: {
      root: [
        path.join(projectPath, '/node_modules'),
        path.join(saguiPath, '/node_modules')
      ]
    },

    resolveLoader: {
      modulesDirectories: [
        path.join(projectPath, '/node_modules'),
        path.join(saguiPath, '/node_modules')
      ]
    },

    output: {
      path: path.join(projectPath, 'dist'),
      filename: 'index.js'
    },

    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
      new HotModuleReplacementPlugin()
    ],

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
