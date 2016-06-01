import { expect } from 'chai'
import { optimize } from 'webpack'

import plugin from './optimize'

describe('optimize preset', function () {
  describe('production build target', function () {
    it('should configure DedupePlugin', function () {
      const config = plugin.configure({ buildTarget: 'production' })

      const commons = config.plugins.filter((plugin) => plugin instanceof optimize.DedupePlugin)
      expect(commons.length).equal(1)
    })

    it('should configure UglifyJsPlugin without the warnings', function () {
      const config = plugin.configure({ buildTarget: 'production' })

      const commons = config.plugins.filter((plugin) => plugin instanceof optimize.UglifyJsPlugin)
      expect(commons.length).equal(1)

      const uglifyJsPlugin = commons[0]
      expect(uglifyJsPlugin.options.compress.warnings).to.eql(false)
    })
  })
})
