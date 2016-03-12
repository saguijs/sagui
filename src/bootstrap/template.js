import { join, basename } from 'path'
import { logWarning } from '../util/log'
import fileExists from '../util/file-exists'
import template from 'template-directory'

const templatePath = join(__dirname, '../../template')

export default function (projectPath) {
  const srcFolder = join(projectPath, 'src')

  if (!fileExists(srcFolder)) {
    copyTemplates(projectPath)
  } else {
    logWarning('skipped installing files in src, folder already exists')
  }
}

function copyTemplates (projectPath) {
  const projectName = basename(projectPath)

  template(templatePath, projectPath, {
    projectName: projectName
  }, { clobber: false })
}
