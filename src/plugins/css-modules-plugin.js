import merge from 'webpack-merge'
import postCSSModulesValues from 'postcss-modules-values'

export default function scssPlugin (env) {
  const { webpackConfig: base } = env

  const webpackConfig = merge(base, {
    postcss: [
      // allow importing values (variables) between css modules
      // see: https://github.com/css-modules/postcss-modules-values#usage
      postCSSModulesValues
    ],

    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: [
            'style-loader',
            // importLoaders: use the following postcss-loader in @import statements
            // modules: enable css-mobules
            'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]-[hash]',
            'postcss-loader'
          ]
        }
      ]
    }
  })

  return { ...env, webpackConfig }
}
