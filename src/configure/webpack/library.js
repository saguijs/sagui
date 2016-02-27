import { join } from 'path'

export default {
  name: 'webpack-library',
  configure ({ library, projectPath }) {
    if (!library) { return {} }

    const externals = probeExternals(projectPath)

    return {
      entry: './index.js',
      output: {
        filename: 'index.js',
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
