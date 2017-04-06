import { execFile } from 'child_process'
import flow from 'flow-bin'
import { logError, log, logWarning } from '../util/log'

const errorCodes = {
  TYPECHECK_ERROR: 2
}

export default (saguiConfig) => new Promise((resolve, reject) => {
  const commandArgs = ['check', '--color=always']

  if (saguiConfig.javaScript && saguiConfig.javaScript.typeCheckAll) {
    commandArgs.push('--all')
  }

  if (!flow) {
    logWarning('Typecheck is not support in your platform.')
    logWarning('For more information go to https://github.com/flowtype/flow-bin/issues/')
    return resolve()
  }

  try {
    execFile(flow, commandArgs, { cwd: saguiConfig.projectPath }, (err, stdout, stderr) => {
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
  } catch (e) {
    reject(e)
  }
})
