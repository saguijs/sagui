import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
import { optimize } from 'webpack'

export default {
  name: 'pages',
  configure ({ pages = [], buildTarget, projectPath }) {
    if (pages.length === 0) { return {} }

    const entry = configureEntry(pages, buildTarget)
    const plugins = configurePlugins(pages, buildTarget)

    return {
      output: {
        path: join(projectPath, 'build'),
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

  pages.forEach((page) => {
    entry[page] = [`./${page}`]

    if (buildTarget === 'development') {
      entry[page].push(hotMiddleware)
    }
  })

  return entry
}

function configurePlugins (pages, buildTarget) {
  const plugins = pages.map((page) => {
    return new HtmlWebpackPlugin({
      template: `${page}.html`,
      filename: `${page}.html`,
      chunks: ['common', page]
    })
  })

  if (pages.length > 1 && buildTarget !== 'test') {
    plugins.push(new optimize.CommonsChunkPlugin({ name: 'common' }))
  }

  return plugins
}
