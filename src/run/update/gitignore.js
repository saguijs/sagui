import path from 'path'
import updateGitignore from './update-gitignore'
import { readFileSync, writeFileSync, ensureFileSync } from 'fs-extra'

export default function (projectPath) {
  const gitignorePath = path.join(projectPath, '.gitignore')
  ensureFileSync(gitignorePath)
  const gitignoreContent = readFileSync(gitignorePath).toString()

  const newGitignoreContent = updateGitignore(gitignoreContent)
  if (newGitignoreContent !== gitignoreContent) {
    writeFileSync(gitignorePath, newGitignoreContent)
  }
}
