import path from 'path'
import updateNpmScripts from './update-npm-scripts'
import json from '../../util/json'

export default function (projectPath) {
  const packagePath = path.join(projectPath, 'package.json')
  const packageJSON = json.read(packagePath)

  const newScripts = updateNpmScripts(packageJSON.scripts)
  const scriptsNeedsToBeUpdated = JSON.stringify(newScripts) !== JSON.stringify(packageJSON.scripts)
  if (scriptsNeedsToBeUpdated) {
    json.write(packagePath, {
      ...packageJSON,
      scripts: newScripts
    })
  }
}
