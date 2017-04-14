import path from 'path'
import json from '../util/json'
import fileExists from '../util/file-exists'

export default (saguiConfig) => {
  const { projectPath } = saguiConfig

  sanityCheck(projectPath)

  const configPath = path.join(projectPath, 'sagui.config.js')

  if (!fileExists(configPath)) { return {} }
  return require(configPath)
}

function sanityCheck (projectPath) {
  const packagePath = path.join(projectPath, 'package.json')
  if (!fileExists(packagePath)) throw new MissingPackageJSON()

  const packageJSON = json.read(packagePath)
  if (packageJSON.name === 'sagui') throw new SaguiPath()
}

export function MissingPackageJSON () {
  this.name = 'MissingPackageJSON'
  this.message = 'Must be executed in target project\'s package.json path'
  this.stack = (new Error()).stack
}
MissingPackageJSON.prototype = Object.create(Error.prototype)
MissingPackageJSON.prototype.constructor = MissingPackageJSON

export function SaguiPath () {
  this.name = 'SaguiPath'
  this.message = 'Sagui CLI must not be run in Sagui\'s path'
  this.stack = (new Error()).stack
}
SaguiPath.prototype = Object.create(Error.prototype)
SaguiPath.prototype.constructor = SaguiPath
