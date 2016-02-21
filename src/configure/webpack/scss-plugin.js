import path from 'path'

export default function scssPlugin ({ projectPath }) {
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
