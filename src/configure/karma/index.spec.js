import { expect } from 'chai'
import configureKarma from './index'

describe('configure karma', function () {
  const baseConfiguration = {
    webpackConfig: ['first', 'seccond']
  }

  it('should the first availbale webpackConfig from the webpackConfig array to prevent double test execution', function () {
    const config = configureKarma(baseConfiguration)
    expect(config.karmaConfig.webpack).equal('first')
  })

  describe('extension', function () {
    it('should allow overwriting the default configuration', function () {
      const defaultConfig = configureKarma(baseConfiguration)
      expect(defaultConfig.karmaConfig.browsers).deep.eql(['PhantomJS'])

      const config = configureKarma({ ...baseConfiguration, karmaConfig: { browsers: ['Chrome'] } })
      expect(config.karmaConfig.browsers).deep.eql(['Chrome'])
    })
  })
})
