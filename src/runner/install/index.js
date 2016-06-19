import packageJSON from './package-json'
import template from './template'

/**
 * Bootstrap and updates project structures
 */
export default ({ projectPath }) => new Promise((resolve, reject) => {
  try {
    packageJSON(projectPath)
    template(projectPath)
  } catch (e) {
    reject(e)
  }

  resolve()
})
