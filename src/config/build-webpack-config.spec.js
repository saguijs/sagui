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

        const expectedConfig = {
          chunks: [ 'common', 'index' ],
          filename: 'index.html',
          inject: true,
          template: 'src/index.html'
        }

        expect(html[0].options).deep.eql(expectedConfig)
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

        const expectedFirstConfig = {
          chunks: [ 'common', 'index' ],
          filename: 'index.html',
          inject: true,
          template: 'src/index.html'
        }

        expect(html[0].options).deep.eql(expectedFirstConfig)

        const expectedSecondConfig = {
          chunks: [ 'common', 'demo' ],
          filename: 'demo.html',
          inject: true,
          template: 'src/demo.html'
        }

        expect(html[1].options).deep.eql(expectedSecondConfig)
      })
    })
  })
})
