import { join, basename } from 'path'
import { copySync } from 'fs-extra'
import template from 'template-directory'
import { logWarning } from '../../util/log'
import fileExists from '../../util/file-exists'
import templatesDotFiles from './template-dotfiles'

const basePath = join(__dirname, '../../../template/base')
const dotFilesPath = join(__dirname, '../../../template/dot-files')

export default function (projectPath) {
  const srcFolder = join(projectPath, 'src')

  if (!fileExists(srcFolder)) {
    copyBase(projectPath)
    copyDotFiles(projectPath)
  } else {
    logWarning('skipped installing files in src, folder already exists')
  }
}

function copyBase (projectPath) {
  const projectName = basename(projectPath)

  template(basePath, projectPath, {
    projectName: projectName
  }, { clobber: false })
}

function copyDotFiles (projectPath) {
  Object.keys(templatesDotFiles)
    .map((key) => [key, templatesDotFiles[key]])
    .map(([templateName, path]) => copySync(
      join(dotFilesPath, templateName),
      join(projectPath, path),
      { clobber: false }
    ))
}
