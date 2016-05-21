import { expect } from 'chai'
import karma from './index'

describe('configure karma', function () {
  const webpackConfig = ['first', 'seccond']

  it('should the first availbale webpackConfig from the webpackConfig array to prevent double test execution', function () {
    const config = karma()({}, webpackConfig)
    expect(config.webpack).equal('first')
  })

  describe('extension', function () {
    it('should allow overwriting the default configuration', function () {
      const defaultConfig = karma()({}, webpackConfig)
      expect(defaultConfig.browsers).deep.eql(['PhantomJS'])

      const config = karma()({ browsers: ['Chrome'] }, webpackConfig)
      expect(config.browsers).deep.eql(['Chrome'])
    })
  })
})
