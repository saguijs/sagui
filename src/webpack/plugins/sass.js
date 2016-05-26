import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  name: 'sass',
  configure ({ pages = [], projectPath, buildTarget }) {
    const extractCSS = new ExtractTextPlugin('[name]-[hash]-sass.css')
    const enabled = pages.length > 0 && buildTarget === 'production'
    const localIdentName = enabled ? '[hash]' : '[path][local]'

    // importLoaders: use the following sass-loader in @import statements
    // modules: enable css-modules
    const loaders = [
      `css?modules&sourceMap&importLoaders=2&localIdentName=${localIdentName}`,
      'resolve-url', // Fixes loading of relative URLs in nested Sass modules
      'sass?sourceMap&outputStyle=expanded&' +
'includePaths[]=' + (path.resolve(projectPath, './node_modules'))
    ]

    return {
      module: {
        loaders: [
          {
            test: /\.scss$/,
            loader: enabled ? extractCSS.extract(loaders) : ['style', ...loaders].join('!')
          }
        ]
      },
      plugins: enabled ? [extractCSS] : []
    }
  }
}
