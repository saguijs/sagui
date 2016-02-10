import { join } from 'path'
import json from '../../util/json'
import fileExists from '../../util/file-exists'

export default function (env) {
  const path = process.env.SAGUI_LINK ? {
    projectPath: process.cwd(),
    saguiPath: join(process.cwd(), 'node_modules/sagui')
  } : {
    projectPath: join(__dirname, '../../../../../'),
    saguiPath: join(__dirname, '../../../')
  }

  sanityCheck(path)

  return { ...env, ...path }
}

function sanityCheck ({ projectPath }) {
  const packagePath = join(projectPath, 'package.json')
  if (!fileExists(packagePath)) throw new InvalidPath()

  const packageJSON = json.read(packagePath)
  if (packageJSON.name === 'sagui') throw new InvalidPath()
}

export class InvalidPath extends Error {
  constructor () {
    super()
    this.name = 'InvalidPath'
  }
}
