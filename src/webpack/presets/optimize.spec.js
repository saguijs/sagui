import { expect } from 'chai'
import { optimize } from 'webpack'
import preset from './optimize'

describe('optimize webpack preset', function () {
  describe('when enabled with the optimize flag', function () {
    it('should configure DedupePlugin', function () {
      const config = preset.configure({ optimize: true })

      const commons = config.plugins.filter((preset) => preset instanceof optimize.DedupePlugin)
      expect(commons.length).equal(1)
    })

    it('should configure UglifyJsPlugin without the warnings', function () {
      const config = preset.configure({ optimize: true })

      const commons = config.plugins.filter((preset) => preset instanceof optimize.UglifyJsPlugin)
      expect(commons.length).equal(1)

      const uglifyJsPlugin = commons[0]
      expect(uglifyJsPlugin.options.compress.warnings).to.eql(false)
    })
  })
})
