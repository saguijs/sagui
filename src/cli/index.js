import path from 'path'
import program from 'commander'
import sagui, { MissingPackageJSON, SaguiPath } from '../index'
import { logError, logWarning, log } from '../util/log'
import actions from '../actions'

/**
 * Command line interface for Sagui
 */
export default (argv = []) => {
  try {
    program.parse(argv)
  } catch (e) {
    handleError(e)
  }
}

const handleError = (e) => {
  if (e instanceof SaguiPath || e instanceof MissingPackageJSON) {
    logWarning(e.message)
    return
  }

  if (e) {
    logError(e.stack || e)
  }

  process.exit(1)
}

const setupAction = (NODE_ENV, actionsToRun, options = {}) => (cliOptions = {}) => {
  if (!process.env.NODE_ENV || (process.env.NODE_ENV && process.env.NODE_ENV.trim().length === 0)) {
    process.env.NODE_ENV = NODE_ENV
    log(`Setting NODE_ENV=${NODE_ENV}`)
  } else {
    log(`Using NODE_ENV=${NODE_ENV}`)
  }

  const tasks = actionsToRun.map((action) => {
    return () => sagui({
      ...options,
      ...cliOptions,
      action,
      projectPath: process.env.SAGUI_LINK
        ? process.cwd()
        : path.join(__dirname, '../../../../')
    })
  })

  tasks.reduce((previous, next) => previous.then(next), Promise.resolve())
    .then(() => process.exit(0), handleError)
}

program.command('develop')
  .description('Run development environment')
  .option('-p, --port <n>', 'Port the server will listen (default: 3000)', parseInt)
  .action(setupAction('development', [actions.DEVELOP]))

program.command('build')
  .description('Build based on the DEVELOPMENT environment')
  .option('-p, --optimize', 'Optimize the build (minify, dedup...)')
  .action(setupAction('development', [actions.BUILD]))

program.command('dist')
  .description('Build and optimize a ready for PRODUCTION distribution')
  .action(setupAction('production', [actions.BUILD], { optimize: true }))

program.command('test')
  .description('Run all the test checks (with coverage enabled)')
  .action(setupAction('test', [actions.TEST_LINT, actions.TEST_TYPECHECK, actions.TEST_UNIT]), { coverage: true })

program.command('test:unit')
  .description('Run unit tests')
  .option('-w, --watch', 'Run tests on any file change')
  .option('-c, --coverage', 'Generate a coverage report')
  .action(setupAction('test', [actions.TEST_UNIT]))

program.command('test:lint')
  .description('Lint the code')
  .action(setupAction('test', [actions.TEST_LINT]))

program.command('test:typecheck')
  .description('Typecheck the code')
  .action(setupAction('test', [actions.TEST_TYPECHECK]))

program.command('update')
  .description('Update Sagui in the current project')
  .action(setupAction('development', [actions.UPDATE]))
