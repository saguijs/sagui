import { expect } from 'chai'
import karma from '.'

describe('karma', function () {
  const webpackConfig = ['first', 'seccond']

  it('should the first availbale webpackConfig from the webpackConfig array to prevent double test execution', function () {
    expect(karma({ webpack: webpackConfig }).karma.webpack).equal('first')
  })

  describe('extension', function () {
    it('should allow overwriting the default configuration', function () {
      expect(karma({ webpack: webpackConfig }).karma.browsers).eql(['PhantomJS'])
      expect(karma({ webpack: webpackConfig, karma: { browsers: ['Chrome'] } }).karma.browsers).eql(['Chrome'])
    })
  })
})
