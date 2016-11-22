import fs from 'fs-extra'
import path from 'path'
import { expect } from 'chai'
import sagui from '.'
import actions from './actions'
import temp from 'temp'

// make sure the temp folders are cleaned up
temp.track()

/**
 * Simulate a complete install of Sagui in a target folder.
 *
 * It symlinks all the dependencies in place
 * and copies the require Sagui files.
 */
const npmInstall = (projectPath) => {
  const nodeModules = path.join(__dirname, '../node_modules')
  const packages = fs.readdirSync(nodeModules)

  packages.forEach((name) => fs.ensureSymlinkSync(path.join(nodeModules, name), path.join(projectPath, 'node_modules', name)))

  const saguiInNodeModules = path.join(projectPath, 'node_modules/sagui/karma-static-files')
  fs.ensureDirSync(saguiInNodeModules)
  fs.copySync(path.join(__dirname, '../karma-static-files'), saguiInNodeModules)
}

describe('[integration] sagui', function () {
  const projectFixture = path.join(__dirname, '../spec/fixtures/simple-project')
  const projectContent = path.join(__dirname, '../spec/fixtures/project-content')
  let projectPath, projectSrcPath

  beforeEach(function () {
    projectPath = temp.mkdirSync('sagui-test-project')
    projectSrcPath = path.join(projectPath, 'src')

    npmInstall(projectPath)
    fs.copySync(projectFixture, projectPath)
  })

  describe('after install', () => {
    beforeEach(() => {
      sagui({ projectPath, action: actions.UPDATE }).run()
    })

    it('should configure webpack', () => {
      const webpack = sagui({ projectPath }).webpack
      expect(webpack.length).to.equal(1)
    })

    it('should configure karma', () => {
      const karma = sagui({ projectPath }).karma
      expect(karma.webpack).to.exist
    })

    it('should be possible to build', () => {
      return sagui({ projectPath, action: actions.BUILD }).run()
    })

    it('should be possible to test', () => {
      return sagui({ projectPath, action: actions.TEST_UNIT }).run()
    })

    it('should be possible to test (with coverage)', () => {
      return sagui({ projectPath, action: actions.TEST_UNIT, coverage: true }).run()
    })

    it('should be possible to lint', () => {
      return sagui({ projectPath, action: actions.TEST_LINT }).run()
    })

    it('should have an .npmignore file', () => {
      fs.readFileSync(path.join(projectPath, '.npmignore'))
    })

    describe('once we add content', () => {
      beforeEach(function () {
        fs.copySync(projectContent, projectSrcPath, { clobber: true })
      })

      it('should be possible to build', () => {
        return sagui({ projectPath, action: actions.BUILD }).run()
      })

      it('should be possible to keep updating Sagui', () => {
        return sagui({ projectPath, action: actions.UPDATE }).run()
      })
    })
  })
})
