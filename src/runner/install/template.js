import { join, basename } from 'path'
import { copySync } from 'fs-extra'
import template from 'template-directory'
import { logWarning } from '../../util/log'
import fileExists from '../../util/file-exists'

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
  copySync(join(dotFilesPath, 'babelrc'), join(projectPath, '.babelrc'), { clobber: false })
  copySync(join(dotFilesPath, 'editorconfig'), join(projectPath, '.editorconfig'), { clobber: false })
  copySync(join(dotFilesPath, 'eslintrc'), join(projectPath, '.eslintrc'), { clobber: false })
  copySync(join(dotFilesPath, 'eslintignore'), join(projectPath, '.eslintignore'), { clobber: false })
  copySync(join(dotFilesPath, 'gitignore'), join(projectPath, '.gitignore'), { clobber: false })
}
