import { join } from 'path'
import buildTargets from '../../build-targets'

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
  configure ({ library, projectPath, buildTarget }) {
    if (!library) { return {} }

    const externals = probeExternals(projectPath)

    return {
      entry: `./${library}.js`,
      output: {
        path: join(projectPath, 'dist'),
        filename: `${library}.js`,
        libraryTarget: buildTarget === buildTargets.TEST ? undefined : 'commonjs2'
      },
      externals: buildTarget === buildTargets.TEST ? [] : externals
    }
  }
}

function probeExternals (projectPath) {
  const projectPackageJSON = require(join(projectPath, 'package.json'))
  return Object.keys(projectPackageJSON.peerDependencies || {})
}
