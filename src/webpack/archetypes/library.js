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

    return {
      entry: `./${library}.js`,
      output: {
        path: join(projectPath, 'dist'),
        filename: `${library}.js`,
        libraryTarget: action === actions.TEST ? undefined : 'commonjs2'
      },
      externals: action === actions.TEST ? [] : externals
    }
  }
}

function probeExternals (projectPath) {
  const projectPackageJSON = require(join(projectPath, 'package.json'))
  return Object.keys(projectPackageJSON.peerDependencies || {})
}
