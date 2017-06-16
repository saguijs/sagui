import { expect } from 'chai'
import updateGitignore from './update-gitignore'

const gitignore = `.DS_Store
.sagui
coverage
dist
node_modules
npm-debug.log`

describe('updateGitignore', () => {
  describe('given there is no content', () => {
    it('should set the content', () => {
      const gitignoreContent = updateGitignore('')

      expect(gitignoreContent).to.eql(gitignore)
    })
  })

  describe('given the file exists and it doesn’t have any of Sagui’s entries', () => {
    // Make sure example was not alphabetical to start with
    it('should append Sagui entries without changing the order of the existing ones', () => {
      const gitignoreContent = updateGitignore(`fakeEntry1
something else
more else
`)

      expect(gitignoreContent).to.eql(`fakeEntry1
something else
more else
${gitignore}`)
    })
  })

  describe('given exists and has some Sagui entries', () => {
    it('should append the missing ones with no duplicates', () => {
      const gitignoreContent = updateGitignore(`fakeEntry1
node_modules
more else`)

      expect(gitignoreContent).to.eql(`fakeEntry1
node_modules
more else
.DS_Store
.sagui
coverage
dist
npm-debug.log`)
    })
  })
})
