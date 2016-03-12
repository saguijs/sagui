import packageJSON from './package-json'
import template from './template'

/**
 * Bootstrap and updates project structures
 * @param  {String} projectPath target Sagui project
 */
export default function bootstrap (projectPath) {
  packageJSON(projectPath)
  template(projectPath)
}
