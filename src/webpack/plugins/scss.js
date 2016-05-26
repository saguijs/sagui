import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  name: 'scss',
  configure ({ pages = [], projectPath, buildTarget }) {
    const extractCSS = new ExtractTextPlugin('[name]-[hash]-scss.css')
    const enabled = pages.length > 0 && buildTarget === 'production'

    const baseLoader = 'css!resolve-url!sass?sourceMap&outputStyle=expanded&' +
      'includePaths[]=' + (path.resolve(projectPath, './node_modules'))

    return {
      module: {
        loaders: [
          {
            test: /\.scss$/,
            loader: enabled ? extractCSS.extract(baseLoader) : `style!${baseLoader}`
          }
        ]
      },
      plugins: enabled ? [extractCSS] : []
    }
  }
}
