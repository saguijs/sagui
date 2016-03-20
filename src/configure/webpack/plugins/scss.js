import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  name: 'webpack-scss',
  configure ({ pages = [], projectPath }) {
    const extractCSS = new ExtractTextPlugin('[name]-[hash]-scss.css')
    const hasPages = pages.length > 0

    const baseLoader = 'css!resolve-url!sass?sourceMap&outputStyle=expanded&' +
      'includePaths[]=' + (path.resolve(projectPath, './node_modules'))

    return {
      module: {
        loaders: [
          {
            test: /\.scss$/,
            loader: hasPages ? extractCSS.extract(baseLoader) : `style!${baseLoader}`
          }
        ]
      },
      plugins: hasPages ? [extractCSS] : []
    }
  }
}
