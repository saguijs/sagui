import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackMd5Hash from 'webpack-md5-hash'
import { join } from 'path'
import { optimize } from 'webpack'
import actions from '../../actions'

export default {
  name: 'pages',
  configure ({ pages = [], action, projectPath }) {
    if (pages.length === 0) { return {} }

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

  if (action !== actions.TEST && pages.length > 1) {
    plugins.push(new optimize.CommonsChunkPlugin({ name: 'common' }))
  }

  if (action === actions.BUILD) {
    // Due to an issue in Webpack, its chunkhashes aren't deterministic.
    // To ensure hashes are generated based on the file contents, use webpack-md5-hash plugin.
    plugins.push(new WebpackMd5Hash())
    // Use "OccurrenceOrderPlugin" in order to make build deterministic.
    // See https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95
    plugins.push(new optimize.OccurrenceOrderPlugin(true))
    // Duplicates equal or similar files
    plugins.push(new optimize.DedupePlugin())
  }

  return plugins
}
