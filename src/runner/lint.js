import eslint from 'eslint'
import { logError, log } from '../util/log'
import fileExtensions from '../file-extensions'

export default ({ projectPath }) => new Promise((resolve, reject) => {
  const cli = new eslint.CLIEngine({
    extensions: fileExtensions.list.JAVASCRIPT
  })

  const report = cli.executeOnFiles([projectPath])
  const formatter = cli.getFormatter()

  if (report.errorCount > 0) {
    logError('Lint failed:')
    console.log(formatter(report.results))
    reject()
  } else {
    log('Lint completed without errors.')
    resolve()
  }
})
