import { expect } from 'chai'

import loader from './txt'

describe('txt', function() {
  it('should have a raw loader', function() {
    const webpackConfig = loader.configure({})
    const webpackLoader = webpackConfig.module.rules.find(loader => loader.loader === 'raw-loader')
    expect(webpackLoader.test).eql(/\.(txt)$/)
  })
})
