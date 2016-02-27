import HtmlWebpackPlugin from 'html-webpack-plugin'
import { optimize } from 'webpack'

export default {
  name: 'webpack-pages',
  configure ({ pages = [], buildTarget }) {
    if (pages.length === 0) { return {} }

    const entry = configureEntry(pages, buildTarget)
    const plugins = configurePlugins(pages, buildTarget)

    return {
      output: {
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[hash].chunk.js'
      },
      plugins,
      entry
    }
  }
}

function configureEntry (pages, buildTarget) {
  const hotMiddleware = 'webpack-hot-middleware/client'

  let entry = {}

  pages.forEach(page => {
    entry[page] = [`./src/${page}`]

    if (buildTarget === 'develop') {
      entry[page].push(hotMiddleware)
    }
  })

  return entry
}

function configurePlugins (pages, buildTarget) {
  const plugins = pages.map(page => {
    return new HtmlWebpackPlugin({
      template: `src/${page}.html`,
      filename: `${page}.html`,
      chunks: ['common', page]
    })
  })

  if (pages.length > 1 && buildTarget !== 'test') {
    plugins.push(new optimize.CommonsChunkPlugin({ name: 'common' }))
  }

  return plugins
}
