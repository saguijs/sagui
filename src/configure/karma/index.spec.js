import { expect } from 'chai'
import configureKarma from './index'

describe('configure karma', function () {
  it('should the first availbale webpackConfig from the webpackConfig array to prevent double test execution', function () {
    const config = configureKarma({ webpackConfig: ['first', 'seccond'] })
    expect(config.karmaConfig.webpack).equal('first')
  })
})
