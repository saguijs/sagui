import parentModule from 'parent-module'
import path from 'path'
import karma from './karma'
import webpack from './webpack'
import bootstrap from './bootstrap'
import cli from './cli'
import buildTargets from './build-targets'

export default function sagui ({
  buildTarget = normalize(process.env.NODE_ENV),
  enableCoverage = !!process.env.SAGUI_COVERAGE,
  projectPath = path.dirname(parentModule()),
  saguiPath = path.join(__dirname, '..')
} = {}) {
  return {
    karma: karma({ projectPath, enableCoverage }),
    webpack: webpack({ buildTarget, projectPath, saguiPath, enableCoverage }),
    bootstrap: bootstrap({ projectPath })
  }
}

/**
 * Exposes the Command Line Interface API
 */
sagui.cli = cli

const normalize = (env = buildTargets.DEVELOPMENT) => env.toLowerCase().trim()
