import { expect } from 'chai'

import loader from './html'

describe('html', function () {
  it('should have a html loader', function () {
    const webpackConfig = loader.configure({})
    const webpackLoader = webpackConfig.module.rules.find((loader) => loader.loader === 'html-loader')
    expect(webpackLoader.test).eql(/\.html$/)
  })
})
