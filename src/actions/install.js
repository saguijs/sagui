import { join, basename } from 'path'
import { logWarning } from '../util/log'
import json from '../util/json'
import fileExists from '../util/file-exists'
import template from 'template-directory'

const templatePath = join(__dirname, '../../template')

const defaultScripts = {
  'sagui:test': 'sagui test',
  'sagui:test-watch': 'sagui test --watch',
  'sagui:develop': 'sagui develop',
  'sagui:build': 'sagui build',
  'sagui:dist': 'sagui dist'
}

export default function install ({ projectPath }) {
  const srcFolder = join(projectPath, 'src')

  updatePackageJSON(projectPath)
  if (!fileExists(srcFolder)) {
    copyTemplates(projectPath)
  } else {
    logWarning('skipped installing files in src, folder already exists')
  }
}

function copyTemplates (projectPath) {
  const projectName = basename(projectPath)

  template(templatePath, projectPath, {
    projectName: projectName
  }, { clobber: false })
}

function updatePackageJSON (projectPath) {
  const packagePath = join(projectPath, 'package.json')
  const content = json.read(packagePath)
  const scripts = content.scripts

  Object.assign(scripts, defaultScripts)

  if (!scripts.start) {
    scripts.start = 'npm run sagui:develop'
  }

  if (!scripts.test || scripts.test === 'echo \"Error: no test specified\" && exit 1') {
    scripts.test = 'npm run sagui:test'
  }

  json.write(packagePath, content)
}
