import { join } from 'path'
import fileExists from '../../util/file-exists'
import merge from 'webpack-merge'

export default function userExtensionPlugin (env) {
  const { projectPath } = env
  const extensionPath = join(projectPath, 'sagui.extension.js')

  if (!fileExists(extensionPath)) { return env }

  return { ...env, ...require(extensionPath)(env, merge) }
}
