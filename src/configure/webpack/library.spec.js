import { join } from 'path'
import { expect } from 'chai'
import { configure } from './library'

const saguiPath = join(__dirname, '../../../')
const projectPath = join(saguiPath, 'spec/fixtures/library-project')
const projectWithoutPeerDependenciesPath = join(saguiPath, 'spec/fixtures/library-project-without-peer-dependencies')

describe('configure webpack library', function () {
  describe('simple name configuration', function () {
    const baseConfiguration = {
      library: 'FancyLibrary',
      projectPath
    }

    it('should have a single entry pointing to index.js', function () {
      const webpackConfig = configure(baseConfiguration)
      expect(webpackConfig.entry).eql('./index.js')
    })

    it('should have the default exporting target of commonjs2 (module.exports = xxx)', function () {
      const webpackConfig = configure(baseConfiguration)
      expect(webpackConfig.output.libraryTarget).eql('commonjs2')
    })

    it('should have the filename as index.js', function () {
      const webpackConfig = configure(baseConfiguration)
      expect(webpackConfig.output.filename).eql('index.js')
    })

    it('should have the output path configured as the lib folder', function () {
      const webpackConfig = configure(baseConfiguration)
      expect(webpackConfig.output.path).eql(join(projectPath, 'lib'))
    })

    describe('externals', function () {
      it('should infer the externals based on the packgage.json peerDependencies', function () {
        const webpackConfig = configure(baseConfiguration)
        expect(webpackConfig.externals).eql(['react', 'react-dom'])
      })

      it('should have an empty externals if the packgage.json does not have a peerDependencies', function () {
        const webpackConfig = configure({ ...baseConfiguration, projectPath: projectWithoutPeerDependenciesPath })
        expect(webpackConfig.externals).eql([])
      })
    })
  })
})
