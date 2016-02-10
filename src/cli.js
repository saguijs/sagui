import program from 'commander'
import sagui from './index'
import { InvalidUsage } from './plugins/user-settings/index'
import { logError, log } from './util/log'

program.command('build')
  .description('Build the project')
  .action(function (options) {
    sagui.build(options)
  })

program.command('dist')
  .description('Builds an optimized distribution of the project')
  .action(function (options) {
    sagui.dist(options)
  })

program.command('develop')
  .description('Run development environment')
  .action(function (options) {
    sagui.develop(options)
  })

program.command('test')
  .description('Run tests')
  .option('-w, --watch', 'Run tests on any file change')
  .action(function (options) {
    sagui.test(options)
  })

program.command('install')
  .description('Install or update sagui in the current project')
  .action(function (options) {
    sagui.install(options)
    log('installed in the project')
  })

export default function cli (argv) {
  try {
    program.parse(argv)
  } catch (e) {
    if (e instanceof InvalidUsage) {
      logError('Must be executed in target project\'s package.json path')
    }
  }
  if (!argv.slice(2).length) program.outputHelp()
}
