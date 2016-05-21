import { expect } from 'chai'
import { join } from 'path'
import { HotModuleReplacementPlugin } from 'webpack'

import plugin from './base'

const saguiPath = join(__dirname, '../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

describe('configure webpack base', function () {
  describe('targets', function () {
    it('should have the HotModuleReplacementPlugin enabled while developing', function () {
      const config = plugin.configure({ projectPath, saguiPath, buildTarget: 'development' })

      const commons = config.plugins.filter((plugin) => plugin instanceof HotModuleReplacementPlugin)
      expect(commons.length).equal(1)
    })
  })
})
