import { expect } from 'chai'
import { join } from 'path'
import { HotModuleReplacementPlugin } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import plugin from './base'

const saguiPath = join(__dirname, '../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

describe('configure webpack base', function () {
  it('should add the project\'s `src/` and `node_modules/` to root resolve', function () {
    const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'dist' })

    expect(config.resolve.root).to.eql([
      join(projectPath, '/node_modules'),
      join(saguiPath, '/node_modules'),
      join(projectPath, '/src')
    ])
  })

  it('should have the CleanWebpackPlugin enabled always', function () {
    const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'dist' })

    const commons = config.plugins.filter((plugin) => plugin instanceof CleanWebpackPlugin)
    expect(commons.length).equal(1)

    const cleanWebpackPlugin = commons[0]
    expect(cleanWebpackPlugin.paths).to.eql(['dist'])
    expect(cleanWebpackPlugin.options.verbose).to.eql(false)
    expect(cleanWebpackPlugin.options.root).to.eql(projectPath)
  })

  describe('targets', function () {
    it('should have the HotModuleReplacementPlugin enabled while developing', function () {
      const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'development' })

      const commons = config.plugins.filter((plugin) => plugin instanceof HotModuleReplacementPlugin)
      expect(commons.length).equal(1)
    })
  })
})
