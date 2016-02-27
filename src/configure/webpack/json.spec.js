import { expect } from 'chai'

import { configure } from './json'

describe('configure webpack json', function () {
  it('should have a JSON loader', function () {
    const webpackConfig = configure({})
    const loader = webpackConfig.module.loaders.find(loader => loader.loader === 'json-loader')
    expect(loader.test).eql(/\.(json)$/)
  })
})
