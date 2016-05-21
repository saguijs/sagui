import { expect } from 'chai'
import sinon from 'sinon'
import karma from './index'

describe('configure karma', function () {
  const webpackConfig = ['first', 'seccond']

  it('should the first availbale webpackConfig from the webpackConfig array to prevent double test execution', function () {
    const karmaObject = {
      set: sinon.spy()
    }

    karma()({}, webpackConfig)(karmaObject)
    expect(karmaObject.set.lastCall.args[0].webpack).equal('first')
  })

  describe('extension', function () {
    it('should allow overwriting the default configuration', function () {
      const karmaObject = {
        set: sinon.spy()
      }

      karma()({}, webpackConfig)(karmaObject)
      expect(karmaObject.set.lastCall.args[0].browsers).eql(['PhantomJS'])

      karma()({ browsers: ['Chrome'] }, webpackConfig)(karmaObject)
      expect(karmaObject.set.lastCall.args[0].browsers).eql(['Chrome'])
    })
  })
})
