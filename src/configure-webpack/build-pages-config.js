import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
import { optimize } from 'webpack'
import actions from '../actions'

export default (pages = [], { action, chunks = {}, projectPath }) => {
  if (pages.length === 0 || action === actions.TEST_UNIT) { return {} }

  const entry = configureEntry(pages)
  const plugins = configurePlugins(pages, chunks)
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
    const pageName = getPageName(page)
    entry[pageName] = [`./${pageName}`]
  })

  return entry
}

function configurePlugins (pages, chunksConfig) {
  const plugins = pages.map((page) => {
    const pageName = getPageName(page)
    const chunks = Object.keys(chunksConfig)
      .reduce((chunks, key) => {
        if (chunksConfig[key]) {
          chunks.unshift(key)
        }
        return chunks
      }, [pageName])

    return new HtmlWebpackPlugin({
      template: `${pageName}.html`,
      filename: `${pageName}.html`,
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
        minChunks: (module) => {
          return /node_modules/.test(module.context)
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

function getPageName (page) {
  return (typeof page === 'string' ? page : page.name)
}
