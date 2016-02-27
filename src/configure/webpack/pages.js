import HtmlWebpackPlugin from 'html-webpack-plugin'
import { optimize } from 'webpack'

const defaultPages = []
const hotMiddleware = 'webpack-hot-middleware/client'

export default {
  name: 'webpack-pages',
  configure (config) {
    const entry = configureEntry(config)
    const plugins = configurePlugins(config)

    return { plugins, entry }
  }
}

function configureEntry ({ pages = defaultPages, buildTarget }) {
  let entry = {}

  pages.forEach(page => {
    entry[page] = [`./src/${page}`]

    if (buildTarget === 'develop') {
      entry[page].push(hotMiddleware)
    }
  })

  return entry
}

function configurePlugins ({ pages = defaultPages, buildTarget }) {
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
