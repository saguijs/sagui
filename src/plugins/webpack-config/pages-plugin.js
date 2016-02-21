import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const defaultPages = ['index']
const hotMiddleware = 'webpack-hot-middleware/client'

export default function babelPlugin (env) {
  const { buildTarget, pages = defaultPages, webpackConfig: base } = env

  const plugins = pages.map(page => {
    return new HtmlWebpackPlugin({
      template: `src/${page}.html`,
      filename: `${page}.html`,
      chunks: ['common', page]
    })
  })

  let entry = {}
  pages.forEach(page => {
    entry[page] = [`./src/${page}`]

    if (buildTarget === 'develop') {
      entry[page].push(hotMiddleware)
    }
  })

  const webpackConfig = merge(base, { plugins, entry })

  return { ...env, webpackConfig }
}
