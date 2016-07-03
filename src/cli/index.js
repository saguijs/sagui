import path from 'path'
import program from 'commander'
import sagui, { MissingPackageJSON, SaguiPath } from '../index'
import buildTargets from '../build-targets'
import { logError, logWarning } from '../util/log'
import actions from '../actions'

/**
 * Command line interface for Sagui
 */
export default (argv = []) => {
  try {
    program.parse(argv)
  } catch (e) {
    if (e instanceof SaguiPath || e instanceof MissingPackageJSON) {
      logWarning(e.message)
      return
    }

    logError('Error starting up')
    logError(e.stack || e)
  }

  if (!argv.slice(2).length) program.outputHelp()
}

const setupAction = (action) => (cliOptions = {}) => {
  const options = {
    ...cliOptions,
    action,
    buildTarget: normalize(process.env.NODE_ENV),
    projectPath: process.env.SAGUI_LINK
      ? process.cwd()
      : path.join(__dirname, '../../../../')
  }

  sagui(options).run().then(() => process.exit(0), () => process.exit(1))
}

const normalize = (env = buildTargets.DEVELOPMENT) => env.toLowerCase().trim()

program.command(actions.INSTALL)
  .description('Install or update sagui in the current project')
  .action(setupAction(actions.INSTALL))

program.command(actions.TEST)
  .description('Run tests')
  .option('-w, --watch', 'Run tests on any file change')
  .option('-c, --coverage', 'Generate a coverage report')
  .action(setupAction(actions.TEST))

program.command(actions.LINT)
  .description('Lint the code')
  .action(setupAction(actions.LINT))

program.command(actions.BUILD)
  .description('Build the project')
  .option('-p, --optimize', 'Optimize the build (minify, dedup...)')
  .action(setupAction(actions.BUILD))

program.command(actions.DEVELOP)
  .description('Run development environment')
  .option('-p, --port <n>', 'Port the server will listen (default: 3000)', parseInt)
  .action(setupAction(actions.DEVELOP))

program.command(actions.TYPECHECK)
  .description('Type check the code')
  .action(setupAction(actions.TYPECHECK))
