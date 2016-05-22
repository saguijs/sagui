import { expect } from 'chai'
import { join } from 'path'
import { HotModuleReplacementPlugin, optimize } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import plugin from './base'

const saguiPath = join(__dirname, '../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

describe('configure webpack base', function () {
  it('should have the CleanWebpackPlugin enabled allways', function () {
    const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'dist' })

    const commons = config.plugins.filter((plugin) => plugin instanceof CleanWebpackPlugin)
    expect(commons.length).equal(1)

    const cleanWebpackPlugin = commons[0]
    expect(cleanWebpackPlugin.paths).to.eql(['dist'])
    expect(cleanWebpackPlugin.options.verbose).to.eql(false)
    expect(cleanWebpackPlugin.options.root).to.eql(projectPath)
  })

  describe('targets', function () {
    it('should have the UglifyJsPlugin enabled while distributing', function () {
      const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'dist' })

      const commons = config.plugins.filter((plugin) => plugin instanceof optimize.UglifyJsPlugin)
      expect(commons.length).equal(1)
    })

    it('should have the HotModuleReplacementPlugin enabled while developing', function () {
      const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'develop' })

      const commons = config.plugins.filter((plugin) => plugin instanceof HotModuleReplacementPlugin)
      expect(commons.length).equal(1)
    })
  })
})
