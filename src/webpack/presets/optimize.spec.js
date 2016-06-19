import { expect } from 'chai'
import { optimize } from 'webpack'
import preset from './optimize'
import buildTargets from '../../build-targets'

describe('optimize webpack preset', function () {
  describe('production build target', function () {
    it('should configure DedupePlugin', function () {
      const config = preset.configure({ buildTarget: buildTargets.PRODUCTION })

      const commons = config.plugins.filter((preset) => preset instanceof optimize.DedupePlugin)
      expect(commons.length).equal(1)
    })

    it('should configure UglifyJsPlugin without the warnings', function () {
      const config = preset.configure({ buildTarget: buildTargets.PRODUCTION })

      const commons = config.plugins.filter((preset) => preset instanceof optimize.UglifyJsPlugin)
      expect(commons.length).equal(1)

      const uglifyJsPlugin = commons[0]
      expect(uglifyJsPlugin.options.compress.warnings).to.eql(false)
    })
  })
})
