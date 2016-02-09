import merge from 'webpack-merge'
import path from 'path'

export default function scssPlugin (env) {
  const { projectPath, webpackConfig: base } = env

  const webpackConfig = merge(base, {
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
  })

  return { ...env, webpackConfig }
}
