import { expect } from 'chai'
import fileExtensions from '../../file-extensions'
import loader from './image'

describe('image', function () {
  it('should be a url loader', function () {
    const webpackConfig = loader.configure({})
    const webpackLoader = webpackConfig.module.rules[0]
    expect(webpackLoader.test).eql(fileExtensions.test.IMAGE)
    expect(webpackLoader.use[0]).eql({
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: '[name]-[hash].[ext]'
      }
    })
  })
})
