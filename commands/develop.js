import { buildConfig } from '../src/webpack-config-builder'
import { startServer } from '../src/server'
import { projectPath, saguiPath } from '../src/env'


export function run () {
  const config = buildConfig({
    saguiPath: saguiPath(),
    projectPath: projectPath()
  })

  startServer(config)
}
