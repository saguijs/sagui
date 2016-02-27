import { expect } from 'chai'
import { configure } from './library'

describe('configure webpack library', function () {
  describe('simple name configuration', function () {
    const baseConfiguration = {
      library: 'FancyLibrary'
    }

    it('should have a single entry pointing to src/index.js', function () {
      const webpackConfig = configure(baseConfiguration)
      expect(webpackConfig.entry).eql('./src/index.js')
    })

    it('should have the default exporting target of commonjs2 (module.exports = xxx)', function () {
      const webpackConfig = configure(baseConfiguration)
      expect(webpackConfig.output.libraryTarget).eql('commonjs2')
    })

    it('should have the filename as the slug of the name', function () {
      const webpackConfig = configure(baseConfiguration)
      expect(webpackConfig.output.filename).eql('fancy-library.js')
    })
  })
})
