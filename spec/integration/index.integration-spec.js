import 'babel-polyfill'
import { expect } from 'chai'
import glob from 'glob'
import fs from 'fs-extra'
import path from 'path'
import { JSDOM } from 'jsdom'
import sagui, { InvalidSaguiConfig } from '../../src'
import actions from '../../src/actions'
import temp from 'temp'

// make sure the temp folders are cleaned up
temp.track()

/**
 * Simulate a complete install of Sagui in a target folder.
 *
 * It symlinks all the dependencies in place
 * and copies the required Sagui files.
 */
const npmInstall = (projectPath) => {
  const nodeModules = path.join(__dirname, '../../node_modules')
  const packages = fs.readdirSync(nodeModules)

  packages.forEach((name) => fs.ensureSymlinkSync(path.join(nodeModules, name), path.join(projectPath, 'node_modules', name)))

  const karmaStaticNodeModules = path.join(projectPath, 'node_modules/sagui/karma-static-files')
  fs.ensureDirSync(karmaStaticNodeModules)
  fs.copySync(path.join(__dirname, '../../karma-static-files'), karmaStaticNodeModules)

  const libInNodeModules = path.join(projectPath, 'node_modules/sagui/lib')
  fs.ensureDirSync(libInNodeModules)
  fs.copySync(path.join(__dirname, '../../src/javascript-eslintrc.json'), path.join(libInNodeModules, 'javascript-eslintrc.json'))
}

describe('[integration] sagui', function () {
  const projectFixture = path.join(__dirname, '../fixtures/simple-project')
  const projectContent = path.join(__dirname, '../fixtures/project-content')
  const projectContentWithLintErrors = path.join(__dirname, '../fixtures/project-content-with-lint-errors')
  const projectContentWithPrettierErrors = path.join(__dirname, '../fixtures/project-content-with-prettier-errors')
  const projectContentWithPrettierErrorsInSaguiConfig = path.join(__dirname, '../fixtures/project-content-with-prettier-errors-in-sagui-config')
  const projectContentCustomPrettierOptionsInEslintrc = path.join(__dirname, '../fixtures/project-content-with-custom-prettier-options-in-eslintrc')
  const projectContentWithDynamicImports = path.join(__dirname, '../fixtures/project-content-with-dynamic-import')
  const projectContentWithCaseMismatchInModulePath = path.join(__dirname, '../fixtures/project-with-case-mismatch-in-module-paths')
  const projectContentWithInvalidImports = path.join(__dirname, '../fixtures/project-content-with-invalid-import')

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

    it('should be possible to build for production (dist)', () => {
      return sagui({ projectPath, action: actions.BUILD, optimize: true })
    })

    it('should extract the styles in a separated file by default', () => {
      return sagui({ projectPath, action: actions.BUILD }).then(() => {
        const cssFiles = glob.sync(path.join(projectPath, 'dist/*.css'))
        expect(cssFiles.length).to.eql(1)
      })
    })

    it('should be possible to test', () => {
      return sagui({ projectPath, action: actions.TEST_UNIT })
    })

    it('should be possible to lint', () => {
      return sagui({ projectPath, action: actions.TEST_LINT })
    })

    it('should not lint the dist folder', () => {
      return sagui({ projectPath, action: actions.BUILD })
        .then(() => sagui({ projectPath, action: actions.TEST_LINT }))
    })

    it('should be possible to test (with coverage)', () => {
      return sagui({ projectPath, action: actions.TEST_UNIT, coverage: true })
    })

    it('should have an .gitignore, .flowconfig and .editorconfig file', () => {
      fs.readFileSync(path.join(projectPath, '.gitignore'))
      fs.readFileSync(path.join(projectPath, '.flowconfig'))
      fs.readFileSync(path.join(projectPath, '.editorconfig'))
    })

    it('should add sagui scripts to the project', () => {
      expect(JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'))).scripts.build).eql('sagui build')
    })

    it('should not try to re-write packageJSON on new updates if content is the same', () => {
      // make the package.json read only
      fs.chmodSync(path.join(projectPath, 'package.json'), '0444')
      return sagui({ projectPath, action: actions.UPDATE })
    })

    describe('once we add content', () => {
      beforeEach(function () {
        fs.copySync(projectContent, projectSrcPath, { overwrite: true })
      })

      it('should be possible to build', () => {
        return sagui({ projectPath, action: actions.BUILD })
      })

      it('should be possible to test more files', () => {
        return sagui({ projectPath, action: actions.TEST_UNIT })
      })

      it('should be possible to keep updating Sagui', () => {
        return sagui({ projectPath, action: actions.UPDATE })
      })
    })

    describe('project with transpile dependencies', () => {
      const projectWithTranspileDependencies = path.join(__dirname, '../fixtures/project-with-transpile-dependencies')
      beforeEach(function () {
        fs.copySync(projectWithTranspileDependencies, projectPath, { overwrite: true })
      })

      it('should be possible to build', () => {
        return sagui({ projectPath, action: actions.BUILD })
      })

      it('should be possible to test', () => {
        return sagui({ projectPath, action: actions.TEST_UNIT })
      })
    })

    describe('chunks', () => {
      describe('project with two pages on build', () => {
        const projectFixture = path.join(__dirname, '../fixtures/project-with-two-pages')
        beforeEach(function () {
          fs.copySync(projectFixture, projectPath, { overwrite: true })
          return sagui({ projectPath, action: actions.BUILD })
        })

        it('should have created a common.js file', () => {
          const files = fs.readdirSync(path.join(projectPath, 'dist'))
          expect(files.filter((file) => file.match(/common.+\.js$/))).not.to.be.empty
        })

        it('should NOT have created a vendor.js file', () => {
          const files = fs.readdirSync(path.join(projectPath, 'dist'))
          expect(files.filter((file) => file.match(/vendor.+\.js$/))).to.be.empty
        })
      })

      describe('project with two pages and disabled common chunks on build', () => {
        const projectFixture = path.join(__dirname, '../fixtures/project-with-two-pages-disabled-common')
        beforeEach(function () {
          fs.copySync(projectFixture, projectPath, { overwrite: true })
          return sagui({ projectPath, action: actions.BUILD })
        })

        it('should not have created a common.js file', () => {
          const files = fs.readdirSync(path.join(projectPath, 'dist'))
          expect(files.filter((file) => file.match(/common.+\.js$/))).to.be.empty
        })

        it('should NOT have created a vendor.js file', () => {
          const files = fs.readdirSync(path.join(projectPath, 'dist'))
          expect(files.filter((file) => file.match(/vendor.+\.js$/))).to.be.empty
        })
      })

      describe('project with two pages and enabled vendor chunks on build', () => {
        const projectFixture = path.join(__dirname, '../fixtures/project-with-two-pages-enabled-vendor')
        beforeEach(function () {
          fs.copySync(projectFixture, projectPath, { overwrite: true })
          return sagui({ projectPath, action: actions.BUILD })
        })

        it('should have created a common.js file without the content of the node_modules dependencies', () => {
          const files = fs.readdirSync(path.join(projectPath, 'dist'))
          const commonFiles = files.filter((file) => file.match(/common.+\.js$/))
          const commonContent = fs.readFileSync(path.join(projectPath, 'dist', commonFiles[0])).toString()
          expect(commonFiles).not.to.be.empty
          expect(commonContent).not.to.have.string('dependencyA')
          expect(commonContent).not.to.have.string('dependencyB')
        })

        it('should have created a vendor.js file with the content of the node_modules dependencies', () => {
          const files = fs.readdirSync(path.join(projectPath, 'dist'))
          const vendorFiles = files.filter((file) => file.match(/vendor.+\.js$/))
          const vendorContent = fs.readFileSync(path.join(projectPath, 'dist', vendorFiles[0])).toString()
          expect(vendorFiles).not.to.be.empty
          expect(vendorContent).to.have.string('dependencyA')
          expect(vendorContent).to.have.string('dependencyB')
        })
      })

      describe('project with two pages but one that is independent with vendor and common chunks enabled', () => {
        const projectFixture = path.join(__dirname, '../fixtures/project-with-independent-page')
        beforeEach(function () {
          fs.copySync(projectFixture, projectPath, { overwrite: true })
          return sagui({ projectPath, action: actions.BUILD })
        })

        it('should have created a common.js file without the content of the node_modules dependencies, but with the shared content', () => {
          const files = fs.readdirSync(path.join(projectPath, 'dist'))
          const commonFiles = files.filter((file) => file.match(/common.+\.js$/))
          const commonContent = fs.readFileSync(path.join(projectPath, 'dist', commonFiles[0])).toString()
          expect(commonFiles).not.to.be.empty
          expect(commonContent).not.to.have.string('dependencyA')
          expect(commonContent).not.to.have.string('dependencyB')
          expect(commonContent).to.have.string('shared')
        })

        it('should have created a vendor.js file with the content of the node_modules dependencies', () => {
          const files = fs.readdirSync(path.join(projectPath, 'dist'))
          const vendorFiles = files.filter((file) => file.match(/vendor.+\.js$/))
          const vendorContent = fs.readFileSync(path.join(projectPath, 'dist', vendorFiles[0])).toString()
          expect(vendorFiles).not.to.be.empty
          expect(vendorContent).to.have.string('dependencyA')
          expect(vendorContent).to.have.string('dependencyB')
        })

        it('should include all dependencies and shared code in the independent page', () => {
          const files = fs.readdirSync(path.join(projectPath, 'dist'))
          const aboutFiles = files.filter((file) => file.match(/demo.+\.js$/))
          const aboutContent = fs.readFileSync(path.join(projectPath, 'dist', aboutFiles[0])).toString()
          expect(aboutContent).to.have.string('dependencyA')
          expect(aboutContent).to.have.string('dependencyB')
          expect(aboutContent).to.have.string('shared')
        })
      })
    })

    describe('project with duplicated transient dependencies and colliding node_modules', () => {
      const projectWithNodeModules = path.join(__dirname, '../fixtures/project-with-node-modules')
      beforeEach(function () {
        fs.copySync(projectWithNodeModules, projectPath, { overwrite: true })
      })

      it('should test that different dependencies get different transient dependencies and node_modules should win when colliding names', () => {
        return sagui({ projectPath, action: actions.TEST_UNIT })
      })
    })

    describe('project with custom eslintrc', () => {
      const projectWithCustomEslintrc = path.join(__dirname, '../fixtures/project-with-custom-eslintrc')
      beforeEach(function () {
        fs.copySync(projectWithCustomEslintrc, projectPath, { overwrite: true })
      })

      it('should log a warning on update', () => {
        return sagui({ projectPath, action: actions.UPDATE })
      })
    })

    describe('project with type definitions', () => {
      const projectContentWithTypes = path.join(__dirname, '../fixtures/project-content-with-types')
      beforeEach(function () {
        fs.copySync(projectContentWithTypes, projectSrcPath, { overwrite: true })
      })

      it('should be possible to build', () => {
        return sagui({ projectPath, action: actions.BUILD })
      })

      it('should be possible to type check', () => {
        return sagui({ projectPath, action: actions.TEST_TYPECHECK })
      })
    })

    describe('project with invalid type definitions', () => {
      const projectContentWithInvalidTypes = path.join(__dirname, '../fixtures/project-content-with-invalid-types')
      beforeEach(function () {
        fs.copySync(projectContentWithInvalidTypes, projectSrcPath, { overwrite: true })
      })

      it('should still be possible to build', () => {
        return sagui({ projectPath, action: actions.BUILD })
      })

      it('should fail at type check', () => {
        return sagui({ projectPath, action: actions.TEST_TYPECHECK })
          .then(
            () => { throw new Error('It should have failed') },
            (error) => expect(error.message).to.eql('Type check failed')
          )
      })
    })

    describe('project with invalid configuration', () => {
      const projectWithInvalidConfig = path.join(__dirname, '../fixtures/project-with-invalid-config')
      beforeEach(function () {
        fs.copySync(projectWithInvalidConfig, projectPath, { overwrite: true })
      })

      it('should not be possible to build', () => {
        return sagui({ projectPath, action: actions.BUILD })
          .then(
            () => { throw new Error('It should have failed') },
            (error) => expect(error).instanceof(InvalidSaguiConfig)
          )
      })
    })

    describe('project with existing gitignore', () => {
      const projectWithExistingGitignore = path.join(__dirname, '../fixtures/project-with-existing-gitignore')
      beforeEach(function () {
        fs.copySync(projectWithExistingGitignore, projectPath, { overwrite: true })
      })

      it('should update the content of the .gitignore file', () => {
        return sagui({ projectPath, action: actions.UPDATE })
          .then(
            () => {
              const gitignoreContent = fs.readFileSync(path.join(projectPath, '.gitignore')).toString()

              expect(gitignoreContent).to.eql(`batata
.DS_Store
.sagui
coverage
dist
node_modules
npm-debug.log`)
            })
      })
    })

    describe('style loader', () => {
      const projectWithCSSModules = path.join(__dirname, '../fixtures/project-with-css-modules')
      const htmlContent = fs.readFileSync(path.join(__dirname, '../fixtures/index.html'))

      beforeEach(() => {
        fs.copySync(projectWithCSSModules, projectPath, { overwrite: true })

        const jsdom = new JSDOM(htmlContent)
        global.window = jsdom.window
        global.document = jsdom.window.document
      })

      afterEach(() => {
        global.window.close()
        delete global.window
        delete global.document
      })

      it('should build with the unique CSS Modules keys', () => {
        return sagui({ projectPath, action: actions.BUILD }).then(() => {
          const dist = require(path.join(projectPath, '/dist/index')).default

          expect(dist.componentA).to.match(/content-.{5}/)
          expect(dist.componentB).to.match(/content-.{5}/)
          expect(dist.componentA).not.to.eql(dist.componentB)
        })
      })

      it('should build (optimized) with the unique CSS Modules keys', () => {
        return sagui({ projectPath, action: actions.BUILD, optimize: true }).then(() => {
          const dist = require(path.join(projectPath, '/dist/index')).default

          expect(dist.componentA).to.match(/^.{5,6}$/)
          expect(dist.componentB).to.match(/^.{5,6}$/)
          expect(dist.componentA).not.to.eql(dist.componentB)
        })
      })

      it('should autoprefix CSS rules', () => {
        return sagui({ projectPath, action: actions.BUILD }).then(() => {
          const dist = fs.readFileSync(path.join(projectPath, '/dist/index.js'))

          expect(dist).to.match(/-ms-flex/)
        })
      })
    })

    describe('once we add content with lint errors', () => {
      beforeEach(function () {
        fs.copySync(projectContentWithLintErrors, projectSrcPath, { overwrite: true })
      })

      it('should break the build', () => {
        return sagui({ projectPath, action: actions.BUILD })
          .then(
            () => { throw new Error('It should have failed') },
            (error) => expect(error.message).to.eql('Build failed')
          )
      })

      it('should break the linter', () => {
        return sagui({ projectPath, action: actions.TEST_LINT })
          .then(
            () => { throw new Error('It should have failed') },
            (error) => expect(error.message).to.eql('Lint failed')
          )
      })
    })

    describe('once we add content with prettier errors', () => {
      beforeEach(function () {
        fs.copySync(projectContentWithPrettierErrors, projectSrcPath, { overwrite: true })
      })

      it('should break the build', () => {
        return sagui({ projectPath, action: actions.BUILD })
          .then(
            () => { throw new Error('It should have failed') },
            (error) => expect(error.message).to.eql('Build failed')
          )
      })

      it('should break the linter', () => {
        return sagui({ projectPath, action: actions.TEST_LINT })
          .then(
            () => { throw new Error('It should have failed') },
            (error) => expect(error.message).to.eql('Lint failed')
          )
      })

      it('should be possible to format it and remove the errors', async () => {
        await sagui({ projectPath, action: actions.FORMAT })
        await sagui({ projectPath, action: actions.BUILD })
      })
    })

    describe('once we a sagui.config.js with prettier errors', () => {
      beforeEach(function () {
        fs.copySync(projectContentWithPrettierErrorsInSaguiConfig, projectPath, { overwrite: true })
      })

      it('should break the linter', () => {
        return sagui({ projectPath, action: actions.TEST_LINT })
          .then(
            () => { throw new Error('It should have failed') },
            (error) => expect(error.message).to.eql('Lint failed')
          )
      })

      it('should be possible to format it and remove the errors', async () => {
        await sagui({ projectPath, action: actions.FORMAT })
        await sagui({ projectPath, action: actions.BUILD })
      })
    })

    describe('when there are custom prettier options in .eslintrc', () => {
      beforeEach(function () {
        fs.copySync(projectContentCustomPrettierOptionsInEslintrc, projectPath, { overwrite: true })
      })
      it('`lint` should respect the prettier options from .eslintrc', () => {
        return sagui({ projectPath, action: actions.TEST_LINT })
          .then(
            () => { throw new Error('It should have failed') },
            (error) => expect(error.message).to.eql('Lint failed')
          )
      })
      it('`format` should respect the prettier options from .eslintrc', async () => {
        await sagui({ projectPath, action: actions.FORMAT })
        await sagui({ projectPath, action: actions.TEST_LINT })
      })
    })

    describe('when there are dynamic imports', () => {
      it('`build` should not break', async () => {
        fs.copySync(projectContentWithDynamicImports, projectPath, { overwrite: true })

        await sagui({ projectPath, action: actions.BUILD })
      })
    })

    describe('when there is case mismatch in module paths', () => {
      it('`build` should break', async () => {
        fs.copySync(projectContentWithCaseMismatchInModulePath, projectPath, { overwrite: true })

        await sagui({ projectPath, action: actions.BUILD })
          .then(
            () => { throw new Error('It should have failed because of case mismatch in module path')},
            (error) => expect(error.message).to.eql('Build failed')
          )
      })
    })

    describe('when there are invalid imports', () => {
      it('should not hang the test runner', async () => {
        fs.copySync(projectContentWithInvalidImports, projectPath, { overwrite: true })
        await sagui({ projectPath, action: actions.TEST_UNIT })
          .then(
            () => { throw new Error('It should have failed') },
            (error) => expect(error).to.eql(1)
          )
      })
    })
  })
})
