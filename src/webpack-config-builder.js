import path from 'path'
import { HotModuleReplacementPlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'


export function buildConfig ({ projectPath, saguiPath, watch }) {
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
          test: /(\.js)|(\.jsx)$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            optional: ['runtime'],
            stage: 0
          }
        }
      ]
    }
  }
}
