import program from 'commander'
import { join } from 'path'
import sagui from './index'


const env = {
  projectPath: process.cwd(),
  packagePath: join(process.cwd(), 'package.json'),
  saguiPath: join(process.cwd(), 'node_modules/sagui')
}


program.command('develop')
  .description('Run development environment')
  .action(function (options) {
    sagui.develop(env, options)
  })


program.command('test')
  .description('Run tests')
  .option('-w, --watch', 'Run tests on any file change')
  .action(function (options) {
    sagui.test(env, options)
  })


program.command('install')
  .description('Install or update sagui in the current project')
  .action(function (options) {
    sagui.install(env, options)
  })


export default function cli (argv) {
  program.parse(argv)
  if (!argv.slice(2).length) program.outputHelp()
}
