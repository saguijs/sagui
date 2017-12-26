import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { expect } from 'chai'
import { optimize } from 'webpack'

import actions from '../actions'

import buildPagesConfig from './build-pages-config'

const projectPath = '/tmp/projec-path'

describe.only('pages webpack preset', function () {
  describe('empty pages', function () {
    it('should return an empty configuration', function () {
      const webpackConfig = buildPagesConfig([], { }, { })
      expect(webpackConfig).eql({})
    })
  })

  describe('action is TEST_UNIT', function () {
    it('should return an empty configuration', function () {
      const webpackConfig = buildPagesConfig(['index'], { }, { action: actions.TEST_UNIT })
      expect(webpackConfig).eql({})
    })
  })

  describe('single page', function () {
    const baseConfig = { projectPath }

    it('should have the output path configured as the build folder', function () {
      const webpackConfig = buildPagesConfig(['index'], { }, baseConfig)
      expect(webpackConfig.output.path).eql(path.join(projectPath, 'dist'))
    })

    it('should have the entrypoints setup with the index', function () {
      const webpackConfig = buildPagesConfig(['index'], { }, baseConfig)

      expect(webpackConfig.entry).eql({
        index: ['./index']
      })
    })

    it('should have a plugin setting up the HTML template', function () {
      const webpackConfig = buildPagesConfig(['index'], { common: true }, baseConfig)

      const html = webpackConfig.plugins.filter((plugin) => plugin instanceof HtmlWebpackPlugin)
      expect(html.length).equal(1)

      const options = html[0].options

      expect(options.chunks).deep.eql([ 'common', 'index' ])
      expect(options.filename).deep.eql('index.html')
      expect(options.template).deep.eql('index.html')
    })

    it('should NOT have the CommonsChunkPlugin enabled (not needed)', function () {
      const webpackConfig = buildPagesConfig(['index'], { }, baseConfig)

      const commons = webpackConfig.plugins.filter((plugin) => plugin instanceof optimize.CommonsChunkPlugin)
      expect(commons.length).equal(0)
    })
  })

  describe('multiple pages', function () {
    const baseConfig = { projectPath }

    it('should have two distinct entrypoints', function () {
      const webpackConfig = buildPagesConfig(['index', 'demo'], { }, baseConfig)

      expect(webpackConfig.entry).eql({
        index: ['./index'],
        demo: ['./demo']
      })
    })

    describe('when chunks.common is "true"', function () {
      it('should have a plugin setting up the HTML template for each chunk', function () {
        const webpackConfig = buildPagesConfig(['index', 'demo'], { common: true }, baseConfig)

        const html = webpackConfig.plugins.filter((plugin) => plugin instanceof HtmlWebpackPlugin)
        expect(html.length).equal(2)

        const firstOptions = html[0].options
        expect(firstOptions.chunks).deep.eql([ 'common', 'index' ])
        expect(firstOptions.filename).deep.eql('index.html')
        expect(firstOptions.template).deep.eql('index.html')

        const secondOptions = html[1].options
        expect(secondOptions.chunks).deep.eql([ 'common', 'demo' ])
        expect(secondOptions.filename).deep.eql('demo.html')
        expect(secondOptions.template).deep.eql('demo.html')
      })

      it('should have the CommonsChunkPlugin enabled', function () {
        const webpackConfig = buildPagesConfig(['index', 'demo'], { common: true }, baseConfig)

        const commons = webpackConfig.plugins.filter((plugin) => plugin instanceof optimize.CommonsChunkPlugin)
        expect(commons.length).equal(1)
      })

      it('should set name to "common" in the CommonsChunkPlugin', function () {
        const webpackConfig = buildPagesConfig(['index', 'demo'], { common: true }, baseConfig)

        const commons = webpackConfig.plugins.filter((plugin) => plugin instanceof optimize.CommonsChunkPlugin)
        expect(commons[0].chunkNames[0]).equal('common')
      })

      it('should set minChunks to 2 in the CommonsChunkPlugin', function () {
        const webpackConfig = buildPagesConfig(['index', 'demo'], { common: true }, baseConfig)

        const commons = webpackConfig.plugins.filter((plugin) => plugin instanceof optimize.CommonsChunkPlugin)
        expect(commons[0].minChunks).equal(2)
      })

      it('should set pages as chunks in the CommonsChunkPlugin', function () {
        const webpackConfig = buildPagesConfig(['index', 'demo'], { common: true }, baseConfig)

        const commons = webpackConfig.plugins.filter((plugin) => plugin instanceof optimize.CommonsChunkPlugin)
        expect(commons[0].selectedChunks[0]).equal('index')
        expect(commons[0].selectedChunks[2]).equal('demo')
      })
    })

    describe('when chunks.vendor is "true"', function () {
      it('should have a plugin setting up the HTML template for each chunk', function () {
        const webpackConfig = buildPagesConfig(['index', 'demo'], { vendor: true }, baseConfig)

        const html = webpackConfig.plugins.filter((plugin) => plugin instanceof HtmlWebpackPlugin)
        expect(html.length).equal(2)

        const firstOptions = html[0].options
        expect(firstOptions.chunks).deep.eql([ 'vendor', 'index' ])
        expect(firstOptions.filename).deep.eql('index.html')
        expect(firstOptions.template).deep.eql('index.html')

        const secondOptions = html[1].options
        expect(secondOptions.chunks).deep.eql([ 'vendor', 'demo' ])
        expect(secondOptions.filename).deep.eql('demo.html')
        expect(secondOptions.template).deep.eql('demo.html')
      })

      it('should have the CommonsChunkPlugin enabled', function () {
        const webpackConfig = buildPagesConfig(['index', 'demo'], { vendor: true }, baseConfig)

        const vendor = webpackConfig.plugins.filter((plugin) => plugin instanceof optimize.CommonsChunkPlugin)
        expect(vendor.length).equal(1)
      })

      it('should set name to "vendor" in the CommonsChunkPlugin', function () {
        const webpackConfig = buildPagesConfig(['index', 'demo'], { vendor: true }, baseConfig)

        const vendor = webpackConfig.plugins.filter((plugin) => plugin instanceof optimize.CommonsChunkPlugin)
        expect(vendor[0].chunkNames[0]).equal('vendor')
      })

      it('should set minChunks to a function in the CommonsChunkPlugin', function () {
        const webpackConfig = buildPagesConfig(['index', 'demo'], { vendor: true }, baseConfig)

        const vendor = webpackConfig.plugins.filter((plugin) => plugin instanceof optimize.CommonsChunkPlugin)
        expect(vendor[0].minChunks).to.be.a('function')
      })

      it('should set pages as chunks in the CommonsChunkPlugin', function () {
        const webpackConfig = buildPagesConfig(['index', 'demo'], { vendor: true }, baseConfig)

        const vendor = webpackConfig.plugins.filter((plugin) => plugin instanceof optimize.CommonsChunkPlugin)
        expect(vendor[0].selectedChunks[0]).equal('index')
        expect(vendor[0].selectedChunks[2]).equal('demo')
      })
    })

    describe('when a page is flagged as independent', function () {
      it('should be excluded from both the vendor and common chunks', function () {
        const webpackConfig = buildPagesConfig([
          'index',
          { name: 'demo', independent: true }
        ], {
          vendor: true,
          common: true
        }, baseConfig)

        const plugins = webpackConfig.plugins.filter((plugin) => plugin instanceof optimize.CommonsChunkPlugin)
        const vendor = plugins[0]
        const common = plugins[1]

        expect(vendor.selectedChunks[0]).equal('index')
        expect(vendor.selectedChunks[2]).equal(undefined)
        expect(common.selectedChunks[0]).equal('index')
        expect(common.selectedChunks[2]).equal(undefined)
      })
    })
  })

  describe(`when action is "${actions.BUILD}"`, () => {
    const baseConfig = {
      projectPath, action: actions.BUILD
    }

    it('should setup the output filename of entrypoints based on the name of the page and chunkhash', function () {
      const webpackConfig = buildPagesConfig(['index'], { }, baseConfig)
      expect(webpackConfig.output.filename).eql('[name]-[chunkhash].js')
    })

    it('should setup the output filename of other files based on their name and chunkhash', function () {
      const webpackConfig = buildPagesConfig(['index'], { }, baseConfig)
      expect(webpackConfig.output.chunkFilename).eql('[name]-[chunkhash].chunk.js')
    })
  })

  describe(`when action is NOT "${actions.BUILD}"`, () => {
    const baseConfig = {
      projectPath, action: actions.DEVELOP
    }

    it('should setup the output filename of entrypoints based on the name of the page', function () {
      const webpackConfig = buildPagesConfig(['index'], { }, baseConfig)
      expect(webpackConfig.output.filename).eql('[name].js')
    })

    it('should setup the output filename of other files based on their name', function () {
      const webpackConfig = buildPagesConfig(['index'], { }, baseConfig)
      expect(webpackConfig.output.chunkFilename).eql('[name].chunk.js')
    })
  })
})
