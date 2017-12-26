import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
import { optimize } from 'webpack'
import actions from '../actions'

export default (pages = [], chunksConfig, { action, projectPath }) => {
  if (pages.length === 0 || action === actions.TEST_UNIT) { return {} }

  const entry = configureEntry(pages)
  const plugins = configurePlugins(pages, chunksConfig)
  const filenamePattern = action === actions.BUILD
    ? '[name]-[chunkhash]'
    : '[name]' // For better performance during development

  return {
    output: {
      path: join(projectPath, 'dist'),
      filename: `${filenamePattern}.js`,
      chunkFilename: `${filenamePattern}.chunk.js`
    },
    plugins,
    entry
  }
}

function configureEntry (pages) {
  let entry = {}

  pages.forEach((page) => {
    entry[page] = [`./${page}`]
  })

  return entry
}

function configurePlugins (pages, chunksConfig) {
  const plugins = pages.map((page) => {
    const chunks = Object.keys(chunksConfig)
      .reduce((chunks, key) => {
        if (chunksConfig[key]) {
          chunks.unshift(key)
        }
        return chunks
      }, [page])

    return new HtmlWebpackPlugin({
      template: `${page}.html`,
      filename: `${page}.html`,
      chunks
    })
  })

  if (pages.length > 1) {
    const chunks = pages.reduce((chunks, page) => {
      if (typeof page === 'string') {
        chunks.push(page)
      }
      if (page.independent !== true) {
        chunks.push(page.name)
      }
      return chunks
    }, [])

    if (chunksConfig.vendor) {
      plugins.push(new optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module, context) => {
          return /node_modules/.test(context)
        },
        chunks
      }))
    }
    if (chunksConfig.common) {
      plugins.push(new optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2,
        chunks
      }))
    }
  }

  return plugins
}
