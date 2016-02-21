import HtmlWebpackPlugin from 'html-webpack-plugin'

const defaultPages = ['index']
const hotMiddleware = 'webpack-hot-middleware/client'

export default {
  name: 'webpack-pages',
  configure ({ buildTarget, pages = defaultPages }) {
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

    return { plugins, entry }
  }
}
