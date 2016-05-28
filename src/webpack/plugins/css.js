import postCSSModulesValues from 'postcss-modules-values'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  name: 'css',
  configure ({ pages = [], buildTarget }) {
    const extractCSS = new ExtractTextPlugin('[name]-[hash].css')
    const enabled = pages.length > 0 && buildTarget === 'production'
    const localIdentName = enabled ? '[hash]' : '[path][local]-[hash:base64:5]'

    // importLoaders: use the following postcss-loader in @import statements
    // modules: enable css-modules
    const loaders = [
      `css?modules&sourceMap&importLoaders=1&localIdentName=${localIdentName}`,
      'postcss-loader'
    ]

    return {
      postcss: [
        // allow importing values (variables) between css modules
        // see: https://github.com/css-modules/postcss-modules-values#usage
        postCSSModulesValues
      ],

      module: {
        loaders: [
          {
            test: /\.css$/,
            loader: enabled ? extractCSS.extract(loaders) : ['style', ...loaders].join('!')
          }
        ]
      },

      plugins: enabled ? [extractCSS] : []
    }
  }
}
