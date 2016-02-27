import HtmlWebpackPlugin from 'html-webpack-plugin'
import { expect } from 'chai'

import { configure } from './pages'

describe('configure webpack pages', function () {
  let config

  describe('single page', function () {
    beforeEach(function () {
      config = configure({ pages: ['index'] })
    })

    it('should have the entrypoints setup with the index', function () {
      expect(config.entry).eql({
        index: ['./src/index']
      })
    })

    it('should have a plugin seting up the HTML template', function () {
      const html = config.plugins.filter(plugin => plugin instanceof HtmlWebpackPlugin)
      expect(html.length).equal(1)

      const options = html[0].options

      expect(options.chunks).deep.eql([ 'common', 'index' ])
      expect(options.filename).deep.eql('index.html')
      expect(options.template).deep.eql('src/index.html')
    })
  })

  describe('multiple pages', function () {
    beforeEach(function () {
      config = configure({ pages: ['index', 'demo'] })
    })

    it('should have two distinct entrypoints', function () {
      expect(config.entry).eql({
        index: ['./src/index'],
        demo: ['./src/demo']
      })
    })

    it('should have a plugin seting up the HTML template for each chunk', function () {
      const html = config.plugins.filter(plugin => plugin instanceof HtmlWebpackPlugin)
      expect(html.length).equal(2)

      const firstOptions = html[0].options
      expect(firstOptions.chunks).deep.eql([ 'common', 'index' ])
      expect(firstOptions.filename).deep.eql('index.html')
      expect(firstOptions.template).deep.eql('src/index.html')

      const secondOptions = html[1].options
      expect(secondOptions.chunks).deep.eql([ 'common', 'demo' ])
      expect(secondOptions.filename).deep.eql('demo.html')
      expect(secondOptions.template).deep.eql('src/demo.html')
    })
  })
})
