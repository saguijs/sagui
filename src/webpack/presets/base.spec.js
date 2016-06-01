import { expect } from 'chai'
import { join } from 'path'
import { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack'

import preset from './base'

const saguiPath = join(__dirname, '../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

describe('base webpack preset', function () {
  it('should add the project\'s `src/` and `node_modules/` to root resolve', function () {
    const config = preset.configure({ projectPath, saguiPath, buildTarget: 'production' })

    expect(config.resolve.root).to.eql([
      join(projectPath, '/node_modules'),
      join(saguiPath, '/node_modules'),
      join(projectPath, '/src')
    ])
  })

  it('should resolve jsx files', function () {
    const config = preset.configure({ projectPath, saguiPath, buildTarget: 'production' })

    expect(config.resolve.extensions).to.eql(['', '.js', '.jsx', '.es6'])
  })

  it('should configure NoErrorsPlugin to prevent assets with erros from being emitted', function () {
    const config = preset.configure({ projectPath, saguiPath, buildTarget: 'production' })

    const commons = config.plugins.filter((plugin) => plugin instanceof NoErrorsPlugin)
    expect(commons.length).equal(1)
  })

  describe('development build target', function () {
    it('should configure HotModuleReplacementPlugin', function () {
      const config = preset.configure({ projectPath, saguiPath, buildTarget: 'development' })

      const commons = config.plugins.filter((plugin) => plugin instanceof HotModuleReplacementPlugin)
      expect(commons.length).equal(1)
    })
  })
})
