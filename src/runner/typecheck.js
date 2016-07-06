import { execFile } from 'child_process'
import flow from 'flow-bin'
import { logError, logWarning, log } from '../util/log'

const errorCodes = {
  TYPECHECK_ERROR: 2
}

export default (saguiOptions) => new Promise((resolve, reject) => {
  // Currently Facebook does not provide Windows builds.
  // https://github.com/flowtype/flow-bin#flow-bin-
  //
  // Instead of using `flow`, we show a warning and ignore this task
  // For further discussion, you can go to:
  // https://github.com/saguijs/sagui/issues/179
  if (process.platform === 'win32') {
    logWarning('Type checking in Windows is not currently supported')
    log('Official flow builds for Windows are not currently provided.')
    log('We are exploring options in https://github.com/saguijs/sagui/issues/179')

    return resolve()
  }

  const commandArgs = ['check', '--color=always']

  if (saguiOptions.javaScript && saguiOptions.javaScript.typeCheckAll) {
    commandArgs.push('--all')
  }

  execFile(flow, commandArgs, (err, stdout, stderr) => {
    if (err) {
      logError('Type check failed:\n')

      switch (err.code) {
        case errorCodes.TYPECHECK_ERROR:
          console.log(stdout)
          break

        default:
          console.log(err)
      }

      reject()
    } else {
      log('Type check completed without errors')
      resolve()
    }
  })
})
