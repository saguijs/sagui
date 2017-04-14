import { expect } from 'chai'
import fs from 'fs-extra'
import path from 'path'
import sagui from '../../src'
import actions from '../../src/actions'
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
  const nodeModules = path.join(__dirname, '../../node_modules')
  const packages = fs.readdirSync(nodeModules)

  packages.forEach((name) => fs.ensureSymlinkSync(path.join(nodeModules, name), path.join(projectPath, 'node_modules', name)))

  const saguiInNodeModules = path.join(projectPath, 'node_modules/sagui/karma-static-files')
  fs.ensureDirSync(saguiInNodeModules)
  fs.copySync(path.join(__dirname, '../../karma-static-files'), saguiInNodeModules)
}

describe('[integration] sagui', function () {
  const projectFixture = path.join(__dirname, '../fixtures/simple-project')
  const projectContent = path.join(__dirname, '../fixtures/project-content')
  let projectPath, projectSrcPath

  beforeEach(function () {
    projectPath = temp.mkdirSync('sagui-test-project')
    projectSrcPath = path.join(projectPath, 'src')

    npmInstall(projectPath)
    fs.copySync(projectFixture, projectPath)
  })

  describe('after update', () => {
    beforeEach(() => {
      return sagui({ projectPath, action: actions.UPDATE })
    })

    it('should be possible to build', () => {
      return sagui({ projectPath, action: actions.BUILD })
    })

    it('should be possible to test', () => {
      return sagui({ projectPath, action: actions.TEST_UNIT })
    })

    it('should be possible to test (with coverage)', () => {
      return sagui({ projectPath, action: actions.TEST_UNIT, coverage: true })
    })

    it('should have the browserslist configuration in package.json', () => {
      const packageJSON = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json')))
      expect(packageJSON.browserslist).to.eql([
        '> 1%',
        'Last 2 versions',
        'IE 10'
      ])
    })

    it('should have an .gitignore, .flowconfig and .editorconfig file', () => {
      fs.readFileSync(path.join(projectPath, '.gitignore'))
      fs.readFileSync(path.join(projectPath, '.flowconfig'))
      fs.readFileSync(path.join(projectPath, '.editorconfig'))
    })

    describe('once we add content', () => {
      beforeEach(function () {
        fs.copySync(projectContent, projectSrcPath, { clobber: true })
      })

      it('should be possible to build', () => {
        return sagui({ projectPath, action: actions.BUILD })
      })

      it('should be possible to keep updating Sagui', () => {
        return sagui({ projectPath, action: actions.UPDATE })
      })
    })
  })
})
