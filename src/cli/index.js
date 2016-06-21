import path from 'path'
import program from 'commander'
import sagui, { MissingPackageJSON, SaguiPath } from '../index'
import buildTargets from '../build-targets'
import { logError, logWarning } from '../util/log'

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

program.command('install')
  .description('Install or update sagui in the current project')
  .action(setupAction('install'))

program.command('test')
  .description('Run tests')
  .option('-w, --watch', 'Run tests on any file change')
  .option('-c, --coverage', 'Generate a coverage report')
  .action(setupAction('test'))

program.command('lint')
  .description('Lint the code')
  .action(setupAction('lint'))

program.command('build')
  .description('Build the project')
  .option('-p, --optimize', 'Optimize the build (minify, dedup...)')
  .action(setupAction('build'))

program.command('develop')
  .description('Run development environment')
  .option('-p, --port <n>', 'Port the server will listen (default: 3000)', parseInt)
  .action(setupAction('develop'))
