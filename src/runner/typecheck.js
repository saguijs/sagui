import { execFile } from 'child_process'
import flow from 'flow-bin'
import { logError, log } from '../util/log'

const errorCodes = {
  TYPECHECK_ERROR: 2
}

export default ({ projectPath }) => new Promise((resolve, reject) => {
  execFile(flow, ['check', '--color=always'], (err, stdout, stderr) => {
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
