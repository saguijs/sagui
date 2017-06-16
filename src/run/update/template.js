import { join, basename } from 'path'
import { copySync } from 'fs-extra'
import template from 'template-directory'
import { logWarning } from '../../util/log'
import fileExists from '../../util/file-exists'

const basePath = join(__dirname, '../../../template/base')
const dotFilesPath = join(__dirname, '../../../template/dot-files')

export default function(projectPath) {
  copyBase(projectPath)
  copyDotFiles(projectPath)
}

function copyBase(projectPath) {
  const srcFolder = join(projectPath, 'src')

  if (!fileExists(srcFolder)) {
    const projectName = basename(projectPath)

    template(
      basePath,
      projectPath,
      {
        projectName: projectName,
      },
      { clobber: false }
    )
  } else {
    logWarning('skipped installing files in src, folder already exists')
  }
}

function copyDotFiles(projectPath) {
  safeCopy(join(dotFilesPath, 'editorconfig'), join(projectPath, '.editorconfig'))
  safeCopy(join(dotFilesPath, 'flowconfig'), join(projectPath, '.flowconfig'))
}

function safeCopy(source, destination) {
  try {
    copySync(source, destination, { clobber: false })
  } catch (e) {
    if (e.message === 'EEXIST') {
      // file exists, don't try to overwrite it
    } else {
      throw e
    }
  }
}
