import { expect } from 'chai'
import { join } from 'path'
import { NoErrorsPlugin } from 'webpack'
import preset from './base'
import actions from '../../actions'
import fileExtensions from '../../file-extensions'

const saguiPath = join(__dirname, '../../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

describe('base webpack preset', function () {
  it('should add the project\'s `src/` and `node_modules/` to resolve.modules', function () {
    const config = preset.configure({ projectPath, saguiPath })

    expect(config.resolve.modules).to.eql([
      join(projectPath, '/node_modules'),
      join(projectPath, '/src'),
      join(saguiPath, '/node_modules')
    ])
  })

  it('should resolve files without extension', function () {
    const config = preset.configure({ projectPath, saguiPath })
    expect(config.resolve.extensions).to.eql(fileExtensions.list.JAVASCRIPT)
  })

  describe('NoErrorsPlugin', () => {
    it('should prevent assets with erros from being emitted if action is BUILD', function () {
      const config = preset.configure({ projectPath, saguiPath, action: actions.BUILD })

      const commons = config.plugins.filter((plugin) => plugin instanceof NoErrorsPlugin)
      expect(commons.length).equal(1)
    })

    it('should allow erros if watching while running action TEST', function () {
      const config = preset.configure({ projectPath, saguiPath, action: actions.TEST_UNIT, watch: true })

      const commons = config.plugins.filter((plugin) => plugin instanceof NoErrorsPlugin)
      expect(commons.length).equal(0)
    })

    it('should allow erros if action is DEVELOP', function () {
      const config = preset.configure({ projectPath, saguiPath, action: actions.DEVELOP })

      const commons = config.plugins.filter((plugin) => plugin instanceof NoErrorsPlugin)
      expect(commons.length).equal(0)
    })
  })

  describe('devtool', () => {
    it('should setup the inline-source-map by default', () => {
      const config = preset.configure({ projectPath, saguiPath })
      expect(config.devtool).equal('inline-source-map')
    })

    it('should output a separated source-map file when building', () => {
      const config = preset.configure({ projectPath, saguiPath, action: actions.BUILD })
      expect(config.devtool).equal('source-map')
    })
  })
})
