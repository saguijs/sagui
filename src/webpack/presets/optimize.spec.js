import { expect } from 'chai'
import { optimize } from 'webpack'
import preset from './optimize'
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'

describe('optimize webpack preset', function () {
  describe('when enabled with the optimize flag', function () {
    it('should configure DedupePlugin', function () {
      const config = preset.configure({ optimize: true })

      const commons = config.plugins.filter((preset) => preset instanceof optimize.DedupePlugin)
      expect(commons.length).equal(1)
    })

    it('should configure ParallelUglifyPlugin', function () {
      const config = preset.configure({ optimize: true })

      const commons = config.plugins.filter((preset) => preset instanceof ParallelUglifyPlugin)
      expect(commons.length).equal(1)
    })
  })
})
