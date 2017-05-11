import path from 'path'
import deepEqual from 'deep-equal'
import updateNpmScripts from './update-npm-scripts'
import json from '../../util/json'

export default function (projectPath) {
  const packagePath = path.join(projectPath, 'package.json')
  const packageJSON = json.read(packagePath)

  const newScripts = updateNpmScripts(packageJSON.scripts)
  if (deepEqual(newScripts, packageJSON.scripts)) {
    json.write(packagePath, {
      ...packageJSON,
      scripts: newScripts
    })
  }
}
