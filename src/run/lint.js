import eslint from 'eslint'
import path from 'path'
import { logError, log } from '../util/log'

export default saguiConfig =>
  new Promise((resolve, reject) => {
    const { projectPath } = saguiConfig

    const cli = new eslint.CLIEngine({
      cwd: projectPath,
      configFile: path.join(projectPath, '.eslintrc'),
      useEslintrc: false,
    })

    const report = cli.executeOnFiles([projectPath])
    const formatter = cli.getFormatter()

    if (report.errorCount > 0) {
      logError('Lint failed:')
      console.log(formatter(report.results))
      reject(new Error('Lint failed'))
    } else {
      log('Lint completed without errors.')
      resolve()
    }
  })
