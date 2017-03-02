import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
import { optimize } from 'webpack'
import actions from './actions'

export default (pages = [], { action, projectPath }) => {
  if (pages.length === 0 || action === actions.TEST_UNIT) { return {} }

  const entry = configureEntry(pages)
  const plugins = configurePlugins(pages, action)
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

function configurePlugins (pages, action) {
  const plugins = pages.map((page) => {
    return new HtmlWebpackPlugin({
      template: `${page}.html`,
      filename: `${page}.html`,
      chunks: ['common', page]
    })
  })

  if (pages.length > 1) {
    plugins.push(new optimize.CommonsChunkPlugin({ name: 'common' }))
  }

  return plugins
}
