import { join } from 'path'
import json from '../util/json'

const defaultScripts = {
  'sagui:test': 'sagui test',
  'sagui:test-watch': 'sagui test --watch',
  'sagui:develop': 'sagui develop',
  'sagui:build': 'sagui build',
  'sagui:dist': 'sagui dist'
}

export default function (projectPath) {
  updatePackageJSON(projectPath)
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
