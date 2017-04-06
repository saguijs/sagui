import { expect } from 'chai'

import loader from './json'

describe('json', function () {
  it('should have a JSON loader', function () {
    const webpackConfig = loader.configure({})
    const webpackLoader = webpackConfig.module.loaders.find((loader) => loader.loader === 'json-loader')
    expect(webpackLoader.test).eql(/\.(json)$/)
  })
})
