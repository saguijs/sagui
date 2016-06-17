import { expect } from 'chai'

import preset from './json'

describe('json webpack preset', function () {
  it('should have a JSON loader', function () {
    const webpackConfig = preset.configure({})
    const loader = webpackConfig.module.loaders.find((loader) => loader.loader === 'json-loader')
    expect(loader.test).eql(/\.(json)$/)
  })
})
