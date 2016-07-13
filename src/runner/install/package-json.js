import path from 'path'
import updateNpmScripts from './update-npm-scripts'
import json from '../../util/json'

export default function (projectPath) {
  const packagePath = path.join(projectPath, 'package.json')
  const packageJSON = json.read(packagePath)

  json.write(packagePath, {
    ...packageJSON,
    scripts: updateNpmScripts(packageJSON.scripts)
  })
}
