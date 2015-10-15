import { join, basename } from 'path'
import json from '../../util/json'
import template from 'template-directory'


const templatePath = join(__dirname, 'template')


const defaultScripts = {
  'sagui:test': 'sagui test',
  'sagui:test-watch': 'sagui test --watch',
  'sagui:develop': 'sagui develop',
  'sagui:build': 'sagui build',
  'sagui:dist': 'sagui dist'
}


export default function install (projectPath) {
  updatePackageJSON(projectPath)
  copyTemplates(projectPath)
}


function copyTemplates (projectPath) {
  const projectName = basename(projectPath)

  template(templatePath, projectPath, undefined, {
    projectName: projectName
  })
}


function updatePackageJSON (projectPath) {
  const packagePath = join(projectPath, 'package.json')
  const content = json.read(packagePath)
  Object.assign(content.scripts, defaultScripts)
  json.write(packagePath, content)
}
