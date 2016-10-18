import { join } from 'path'
import actions from '../../actions'

/**
 * Defines how to build a single library.
 *
 * The library parameter is both the name of the file
 * is the src/ directory and also the name of the built
 * artefact.
 *
 * To find more information about how the original configuration
 * parameter `libraries` turns into a single `library`, check
 * the function `splitArchetypes`.
 */
export default {
  name: 'library',
  configure ({ library, projectPath, action }) {
    if (!library) { return {} }

    const externals = probeExternals(projectPath)

    const libraryConfig = typeof library === 'string'
      ? { main: library }
      : library

    const target = libraryConfig.umdName ? 'umd' : 'commonjs2'

    return {
      entry: `./${libraryConfig.main}.js`,
      output: {
        path: join(projectPath, 'dist'),
        filename: `${libraryConfig.main}.js`,
        libraryTarget: action === actions.TEST ? undefined : target,
        library: libraryConfig.umdName
      },
      externals: action === actions.TEST ? [] : externals
    }
  }
}

function probeExternals (projectPath) {
  const projectPackageJSON = require(join(projectPath, 'package.json'))
  return Object.keys(projectPackageJSON.peerDependencies || {})
}
