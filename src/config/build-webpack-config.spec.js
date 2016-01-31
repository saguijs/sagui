import { expect } from 'chai'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { HotModuleReplacementPlugin, optimize } from 'webpack'
import buildWebpackConfig from './build-webpack-config'

const projectPath = ''
const saguiPath = ''

describe('build webpack config', function () {
  let config

  describe('loaders', function () {
    beforeEach(function () {
      config = buildWebpackConfig({ projectPath, saguiPath }, {})
    })

    it('should have a JSON loader', function () {
      const loader = config.module.loaders.find(loader => loader.loader === 'json-loader')
      expect(loader.test).eql(/\.(json)$/)
    })
  })

  describe('targets', function () {
    // see: https://github.com/webpack/karma-webpack/issues/24
    it('should not have the CommonsChunkPlugin enabled while testing', function () {
      config = buildWebpackConfig({ projectPath, saguiPath, buildTarget: 'test' }, {})

      const commons = config.plugins.filter(plugin => plugin instanceof optimize.CommonsChunkPlugin)
      expect(commons.length).equal(0)
    })

    it('should have the UglifyJsPlugin enabled while distributing', function () {
      config = buildWebpackConfig({ projectPath, saguiPath, buildTarget: 'dist' }, {})

      const commons = config.plugins.filter(plugin => plugin instanceof optimize.UglifyJsPlugin)
      expect(commons.length).equal(1)
    })

    it('should have the HotModuleReplacementPlugin enabled while developing', function () {
      config = buildWebpackConfig({ projectPath, saguiPath, buildTarget: 'develop' }, {})

      const commons = config.plugins.filter(plugin => plugin instanceof HotModuleReplacementPlugin)
      expect(commons.length).equal(1)
    })
  })

  describe('pages', function () {
    describe('default', function () {
      beforeEach(function () {
        config = buildWebpackConfig({ projectPath, saguiPath }, {})
      })

      it('should have the entrypoints setup with the index and hot middleware', function () {
        expect(config.entry).eql({
          index: ['./src/index', 'webpack-hot-middleware/client']
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

    describe('custom', function () {
      const pages = ['index', 'demo']

      beforeEach(function () {
        config = buildWebpackConfig({ projectPath, saguiPath, pages }, {})
      })

      it('should have two distinct entrypoints', function () {
        expect(config.entry).eql({
          index: ['./src/index', 'webpack-hot-middleware/client'],
          demo: ['./src/demo', 'webpack-hot-middleware/client']
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
})
