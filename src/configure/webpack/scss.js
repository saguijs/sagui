import path from 'path'

export default {
  name: 'webpack-scss',
  configure ({ projectPath }) {
    return {
      module: {
        loaders: [
          {
            test: /\.scss$/,
            // Query parameters are passed to node-sass
            loader: 'style!css!resolve-url!sass?sourceMap&outputStyle=expanded&' +
              'includePaths[]=' + (path.resolve(projectPath, './node_modules'))
          }
        ]
      }
    }
  }
}
