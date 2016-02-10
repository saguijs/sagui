import { join } from 'path'
import fileExists from '../../util/file-exists'

export default function userExtensionPlugin (env) {
  const { projectPath } = env
  const configPath = join(projectPath, 'sagui.config.js')

  if (!fileExists(configPath)) { return env }

  return { ...env, ...require(configPath) }
}
