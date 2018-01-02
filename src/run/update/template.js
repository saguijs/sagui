import { join, basename } from 'path'
import { copySync, readFileSync } from 'fs-extra'
import template from 'template-directory'
import deepEqual from 'deep-equal'
import { logWarning, logContent } from '../../util/log'
import fileExists from '../../util/file-exists'
import json from '../../util/json'

const basePath = join(__dirname, '../../../template/base')
const dotFilesPath = join(__dirname, '../../../template/dot-files')

export default function (projectPath) {
  copyBase(projectPath)
  copyDotFiles(projectPath)
}

function copyBase (projectPath) {
  const srcFolder = join(projectPath, 'src')

  if (!fileExists(srcFolder)) {
    const projectName = basename(projectPath)

    template(
      basePath,
      projectPath,
      {
        projectName: projectName
      },
      { clobber: false }
    )
  } else {
    logWarning('Skipped installing files in src, folder already exists')
  }
}

function copyDotFiles (projectPath) {
  safeCopy(projectPath, '.editorconfig')
  safeCopy(projectPath, '.eslintignore')
  safeCopy(projectPath, '.eslintrc', diffCheckESLintrc)
  safeCopy(projectPath, '.flowconfig')
}

function safeCopy (projectPath, filename, diffCheck) {
  const sourceAbsolutePath = join(dotFilesPath, filename)
  const destinationAbsolutePath = join(projectPath, filename)

  if (fileExists(destinationAbsolutePath)) {
    if (diffCheck) diffCheck(sourceAbsolutePath, destinationAbsolutePath)
  } else {
    copySync(sourceAbsolutePath, destinationAbsolutePath, { clobber: false })
  }
}

function diffCheckESLintrc (sourceAbsolutePath, destinationAbsolutePath) {
  const rawSourceContent = readFileSync(sourceAbsolutePath).toString()
  const sourceContent = json.read(sourceAbsolutePath)
  const destinationContent = json.read(destinationAbsolutePath)

  if (!deepEqual(sourceContent, destinationContent)) {
    logWarning(`Custom .eslintrc detected: Linting might not work as expected. Expected:`)
    logContent(rawSourceContent)
  }
}
