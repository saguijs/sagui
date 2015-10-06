import { update } from '../src/install'
import { packagePath } from '../src/env'
import { log } from '../src/log'


export function run () {
  log('Updating package.json sagui scripts')
  update(packagePath())
}
