import { expect } from 'chai'
import { join } from 'path'
import { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack'

import plugin from './base'

const saguiPath = join(__dirname, '../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

describe('configure webpack base', function () {
  it('should add the project\'s `src/` and `node_modules/` to root resolve', function () {
    const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'production' })

    expect(config.resolve.root).to.eql([
      join(projectPath, '/node_modules'),
      join(saguiPath, '/node_modules'),
      join(projectPath, '/src')
    ])
  })

  it('should resolve jsx files', function () {
    const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'production' })

    expect(config.resolve.extensions).to.eql(['', '.js', '.jsx', '.es6'])
  })

  it('should configure NoErrorsPlugin to prevent assets with erros from being emitted', function () {
    const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'production' })

    const commons = config.plugins.filter((plugin) => plugin instanceof NoErrorsPlugin)
    expect(commons.length).equal(1)
  })

  describe('development build target', function () {
    it('should configure HotModuleReplacementPlugin', function () {
      const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'development' })

      const commons = config.plugins.filter((plugin) => plugin instanceof HotModuleReplacementPlugin)
      expect(commons.length).equal(1)
    })
  })
})
