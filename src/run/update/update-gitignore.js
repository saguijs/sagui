import uniq from 'lodash.uniq'

const gitignoreEntries = [
  '.DS_Store',
  '.sagui',
  'coverage',
  'dist',
  'node_modules',
  'npm-debug.log',
]

export default currentGitignoreContent => {
  if (currentGitignoreContent.trim() !== '') {
    const originalFileEntries = currentGitignoreContent.split('\n')

    const cleanedEntries = originalFileEntries[originalFileEntries.length - 1].trim() === ''
      ? originalFileEntries.slice(0, -1)
      : originalFileEntries

    return uniq(
      cleanedEntries.concat(gitignoreEntries).map(entry => entry.trim())
    ).join('\n')
  } else {
    return gitignoreEntries.join('\n')
  }
}
