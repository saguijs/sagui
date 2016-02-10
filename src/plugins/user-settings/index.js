import { join } from 'path'
import { statSync } from 'fs'
import json from '../../util/json'

export default function (env) {
  const userSettings = loadProjectConfig(env)
  return { ...env, ...userSettings }
}

function loadProjectConfig (env) {
  const packagePath = join(env.projectPath, 'package.json')
  if (!fileExists(packagePath)) throw new InvalidUsage()

  const packageJSON = json.read(packagePath)
  if (packageJSON.name === 'sagui') throw new InvalidUsage()
  return Object.assign({}, env, packageJSON.sagui || {})
}

function fileExists (file) {
  try {
    statSync(file)
    return true
  } catch (e) {
    return false
  }
}

export class InvalidUsage extends Error {
  constructor () {
    super()
    this.name = 'InvalidUsage'
  }
}
