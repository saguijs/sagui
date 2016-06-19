import path from 'path'
import fileExists from '../util/file-exists'

export default (saguiOptions) => {
  const { projectPath } = saguiOptions
  const configPath = path.join(projectPath, 'sagui.config.js')

  if (!fileExists(configPath)) { return saguiOptions }

  return { ...saguiOptions, ...require(configPath) }
}
