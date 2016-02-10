import webpack from 'webpack'
import { logError } from '../util/log'

export default function buildAndDistribute ({ webpackConfig }) {
  const compiler = webpack(webpackConfig)

  compiler.run(err => {
    if (err) {
      logError('Build failed.')
      console.log(err.message || err)
      process.exit(1)
    }

    logError('Build complete, files written in the dist/ folder.')
  })
}
