import { join } from 'path'
import fileExists from '../util/file-exists'

export default function loadUserConfig (config) {
  const { projectPath } = config
  const configPath = join(projectPath, 'sagui.config.js')

  if (!fileExists(configPath)) { return config }

  return { ...require(configPath), ...config }
}
