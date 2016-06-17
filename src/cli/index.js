import program from 'commander'
import sagui from '../index'
import environment, { MissingPackageJSON, SaguiPath } from './environment'
import { logError, logWarning, log } from '../util/log'

program.command('install')
  .description('Install or update sagui in the current project')
  .action(function () {
    sagui(environment()).bootstrap()
    log('installed in the project')
  })

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



