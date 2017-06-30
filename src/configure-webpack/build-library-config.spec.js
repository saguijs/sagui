import { expect } from 'chai'
import { join } from 'path'

import actions from '../actions'

import buildLibraryConfig from './build-library-config'

const saguiPath = join(__dirname, '../../')
const projectPath = join(saguiPath, 'spec/fixtures/library-project')
const projectWithoutPeerDependenciesPath = join(
  saguiPath,
  'spec/fixtures/library-project-without-peer-dependencies'
)

describe('library webpack preset', function() {
  const baseConfiguration = {
    projectPath,
  }

  describe('action is TEST_UNIT', function() {
    it('should return an empty configuration', function() {
      const webpackConfig = buildLibraryConfig('index', {
        ...baseConfiguration,
        action: actions.TEST_UNIT,
      })
      expect(webpackConfig).eql({})
    })
  })

  it('should have a single entry pointing to index.js', function() {
    const webpackConfig = buildLibraryConfig('index', baseConfiguration)
    expect(webpackConfig.entry).eql('./index.js')
  })

  it('should have the default exporting target of commonjs2 (module.exports = xxx)', function() {
    const webpackConfig = buildLibraryConfig('index', baseConfiguration)
    expect(webpackConfig.output.libraryTarget).eql('commonjs2')
  })

  it('should have the filename as index.js', function() {
    const webpackConfig = buildLibraryConfig('index', baseConfiguration)
    expect(webpackConfig.output.filename).eql('index.js')
  })

  it('should have the output path configured as the build folder', function() {
    const webpackConfig = buildLibraryConfig('index', baseConfiguration)
    expect(webpackConfig.output.path).eql(join(projectPath, 'dist'))
  })

  describe('externals', function() {
    it('should infer the externals based on the packgage.json peerDependencies', function() {
      const webpackConfig = buildLibraryConfig('index', baseConfiguration)
      expect(webpackConfig.externals).eql(['react', 'react-dom'])
    })

    it('should have an empty externals if the packgage.json does not have a peerDependencies', function() {
      const webpackConfig = buildLibraryConfig('index', {
        ...baseConfiguration,
        projectPath: projectWithoutPeerDependenciesPath,
      })
      expect(webpackConfig.externals).eql([])
    })
  })

  describe('umd configuration', function() {
    it('should have the default exporting target of umd', function() {
      const webpackConfig = buildLibraryConfig(
        {
          main: 'index',
          umdName: 'Library',
        },
        baseConfiguration
      )
      expect(webpackConfig.output.libraryTarget).eql('umd')
    })

    it('should have the library with the name of the Library as specified', function() {
      const webpackConfig = buildLibraryConfig(
        {
          main: 'index',
          umdName: 'Library',
        },
        baseConfiguration
      )
      expect(webpackConfig.output.library).eql('Library')
    })
  })
})
