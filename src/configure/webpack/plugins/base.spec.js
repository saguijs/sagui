import { expect } from 'chai'
import { join } from 'path'
import { HotModuleReplacementPlugin, optimize } from 'webpack'

import plugin from './base'

const saguiPath = join(__dirname, '../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

describe('configure webpack base', function () {
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
