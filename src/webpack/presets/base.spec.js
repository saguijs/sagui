import { expect } from 'chai'
import { join } from 'path'
import { NoErrorsPlugin } from 'webpack'
import preset from './base'
import actions from '../../actions'

const saguiPath = join(__dirname, '../../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

describe('base webpack preset', function () {
  it('should add the project\'s `src/` and `node_modules/` to root resolve', function () {
    const config = preset.configure({ projectPath, saguiPath })

    expect(config.resolve.root).to.eql([
      join(projectPath, '/node_modules'),
      join(projectPath, '/src'),
      join(saguiPath, '/node_modules')
    ])
  })

  it('should resolve files without extension', function () {
    const config = preset.configure({ projectPath, saguiPath })
    expect(config.resolve.extensions).to.eql([''])
  })

  it('should configure NoErrorsPlugin to prevent assets with erros from being emitted', function () {
    const config = preset.configure({ projectPath, saguiPath })

    const commons = config.plugins.filter((plugin) => plugin instanceof NoErrorsPlugin)
    expect(commons.length).equal(1)
  })

  describe('devtool', () => {
    it('should setup the much faster cheap-module-eval-source-map by default', () => {
      const config = preset.configure({ projectPath, saguiPath })
      expect(config.devtool).equal('cheap-module-eval-source-map')
    })

    it('should output a separated source-map file when building', () => {
      const config = preset.configure({ projectPath, saguiPath, action: actions.BUILD })
      expect(config.devtool).equal('source-map')
    })
  })
})
