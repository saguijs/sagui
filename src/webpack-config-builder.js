import path from 'path';
import { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';


export function buildConfig ({ projectPath, saguiPath }) {
  return {
    context: projectPath,

    entry: [
      'webpack-hot-middleware/client',
      './src/index'
    ],

    resolve: {
      root: [
        path.join(projectPath, '/node_modules'),
        path.join(saguiPath, '/node_modules')
      ],
    },

    resolveLoader: {
      modulesDirectories: [
        path.join(saguiPath, '/node_modules')
      ]
    },

    output: {
      path: path.join(projectPath, 'dist'),
      filename: 'index.js'
    },

    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
      new HotModuleReplacementPlugin(),
      new NoErrorsPlugin()
    ],

    module: {
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
};
