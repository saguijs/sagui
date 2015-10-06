import { join } from 'path'


export function packagePath () {
  return join(process.cwd(), 'package.json')
}


export function saguiPath () {
  return join(process.cwd(), 'node_modules/sagui')
}


export function projectPath () {
  return process.cwd()
}
