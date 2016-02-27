import { join } from 'path'
import toSlugCase from 'to-slug-case'

export default {
  name: 'webpack-library',
  configure ({ library, projectPath }) {
    if (!library) { return {} }

    const externals = probeExternals(projectPath)

    return {
      entry: './src/index.js',
      output: {
        filename: `${toSlugCase(library)}.js`,
        libraryTarget: 'commonjs2',
        library
      },
      externals
    }
  }
}

function probeExternals (projectPath) {
  const projectPackageJSON = require(join(projectPath, 'package.json'))
  return Object.keys(projectPackageJSON.peerDependencies || {})
}
