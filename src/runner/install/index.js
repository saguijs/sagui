import packageJSON from './package-json'
import template from './template'
import { logError } from '../../util/log'

/**
 * Bootstrap and updates project structures
 */
export default ({ projectPath }) => new Promise((resolve, reject) => {
  try {
    packageJSON(projectPath)
    template(projectPath)
  } catch (e) {
    logError('Failed to install Sagui files in the project.')
    reject(e)
  }

  resolve()
})
