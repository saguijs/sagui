import { join } from 'path'
import { expect } from 'chai'
import plugin from './archetype-library'

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
      const webpackConfig = plugin.configure(baseConfiguration)
      expect(webpackConfig.entry).eql('./index.js')
    })

    it('should have the default exporting target of commonjs2 (module.exports = xxx)', function () {
      const webpackConfig = plugin.configure(baseConfiguration)
      expect(webpackConfig.output.libraryTarget).eql('commonjs2')
    })

    it('should NOT SET the exporting target if buildTarget is test (a browser wont understand commonjs modules)', function () {
      const webpackConfig = plugin.configure({ ...baseConfiguration, buildTarget: 'test' })
      expect(webpackConfig.output.libraryTarget).undefined
    })

    it('should have the filename as index.js', function () {
      const webpackConfig = plugin.configure(baseConfiguration)
      expect(webpackConfig.output.filename).eql('index.js')
    })

    it('should have the output path configured as the dist folder', function () {
      const webpackConfig = plugin.configure(baseConfiguration)
      expect(webpackConfig.output.path).eql(join(projectPath, 'dist'))
    })

    describe('externals', function () {
      it('should infer the externals based on the packgage.json peerDependencies', function () {
        const webpackConfig = plugin.configure(baseConfiguration)
        expect(webpackConfig.externals).eql(['react', 'react-dom'])
      })

      it('should have an empty externals if the buildTarget is test', function () {
        const webpackConfig = plugin.configure({ ...baseConfiguration, buildTarget: 'test' })
        expect(webpackConfig.externals).eql([])
      })

      it('should have an empty externals if the packgage.json does not have a peerDependencies', function () {
        const webpackConfig = plugin.configure({ ...baseConfiguration, projectPath: projectWithoutPeerDependenciesPath })
        expect(webpackConfig.externals).eql([])
      })
    })
  })
})
