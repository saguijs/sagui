import { expect } from 'chai'
import { join } from 'path'
import { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

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

  it('should configure CleanWebpackPlugin', function () {
    const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'production' })

    const commons = config.plugins.filter((plugin) => plugin instanceof CleanWebpackPlugin)
    expect(commons.length).equal(1)

    const cleanWebpackPlugin = commons[0]
    expect(cleanWebpackPlugin.paths).to.eql(['build'])
    expect(cleanWebpackPlugin.options.verbose).to.eql(false)
    expect(cleanWebpackPlugin.options.root).to.eql(projectPath)
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
