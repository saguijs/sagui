import Ajv from 'ajv'
import path from 'path'
import json from './util/json'
import fileExists from './util/file-exists'
import schema from './sagui-config-schema'

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
})

export default saguiConfig => {
  const { projectPath } = saguiConfig

  sanityCheck(projectPath)

  const configPath = path.join(projectPath, 'sagui.config.js')

  if (!fileExists(configPath)) {
    return {}
  }
  return validateConfig(require(configPath))
}

function sanityCheck(projectPath) {
  const packagePath = path.join(projectPath, 'package.json')
  if (!fileExists(packagePath)) throw new MissingPackageJSON()

  const packageJSON = json.read(packagePath)
  if (packageJSON.name === 'sagui') throw new SaguiPath()
}

export function validateConfig(saguiConfig) {
  const isValid = ajv.validate(schema, saguiConfig)
  if (!isValid) {
    throw new InvalidSaguiConfig()
  }

  return saguiConfig
}

export function MissingPackageJSON() {
  this.name = 'MissingPackageJSON'
  this.message = "Must be executed in target project's package.json path"
  this.stack = new Error().stack
}
MissingPackageJSON.prototype = Object.create(Error.prototype)
MissingPackageJSON.prototype.constructor = MissingPackageJSON

export function InvalidSaguiConfig() {
  this.name = 'InvalidSaguiConfig'
  this.message =
    'Invalid configuration. Check documentation at https://github.com/saguijs/sagui#configuration.'
  this.stack = new Error().stack
}
MissingPackageJSON.prototype = Object.create(Error.prototype)
MissingPackageJSON.prototype.constructor = MissingPackageJSON

export function SaguiPath() {
  this.name = 'SaguiPath'
  this.message = "Sagui CLI must not be run in Sagui's path"
  this.stack = new Error().stack
}
SaguiPath.prototype = Object.create(Error.prototype)
SaguiPath.prototype.constructor = SaguiPath
