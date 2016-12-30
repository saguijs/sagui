import path from 'path'
import program from 'commander'
import sagui, { MissingPackageJSON, SaguiPath } from '../index'
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
    process.exit(1)
  }

  if (!argv.slice(2).length) program.outputHelp()
}

const setupAction = (NODE_ENV, action) => (cliOptions = {}) => {
  process.env.NODE_ENV = NODE_ENV

  const options = {
    ...cliOptions,
    action,
    projectPath: process.env.SAGUI_LINK
      ? process.cwd()
      : path.join(__dirname, '../../../../')
  }

  sagui(options).run().then(() => process.exit(0), () => process.exit(1))
}

program.command(actions.DEVELOP)
  .description('Run development environment')
  .option('-p, --port <n>', 'Port the server will listen (default: 3000)', parseInt)
  .action(setupAction('development', actions.DEVELOP))

program.command(actions.BUILD)
  .description('Build the project (production environment)')
  .option('-p, --optimize', 'Optimize the build (minify, dedup...)')
  .action(setupAction('production', actions.BUILD))

program.command(actions.TEST_UNIT)
  .description('Run unit tests')
  .option('-w, --watch', 'Run tests on any file change')
  .option('-c, --coverage', 'Generate a coverage report')
  .action(setupAction('test', actions.TEST_UNIT))

program.command(actions.TEST_LINT)
  .description('Lint the code')
  .action(setupAction('test', actions.TEST_LINT))

program.command(actions.TEST_TYPECHECK)
  .description('Typecheck the code')
  .action(setupAction('test', actions.TEST_TYPECHECK))

program.command(actions.UPDATE)
  .description('Update Sagui in the current project')
  .action(setupAction('development', actions.UPDATE))
