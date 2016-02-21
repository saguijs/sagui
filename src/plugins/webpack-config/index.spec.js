import { expect } from 'chai'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { HotModuleReplacementPlugin, optimize } from 'webpack'
import configureBuilder from './index'

const projectPath = ''
const saguiPath = ''

describe('configure builder', function () {
  let config

  describe('loaders', function () {
    beforeEach(function () {
      config = configureBuilder({ projectPath, saguiPath }).webpackConfig
    })

    it('should have a JSON loader', function () {
      const loader = config.module.loaders.find(loader => loader.loader === 'json-loader')
      expect(loader.test).eql(/\.(json)$/)
    })
  })

  describe('targets', function () {
    // see: https://github.com/webpack/karma-webpack/issues/24
    it('should not have the CommonsChunkPlugin enabled while testing', function () {
      config = configureBuilder({ projectPath, saguiPath, buildTarget: 'test' }).webpackConfig

      const commons = config.plugins.filter(plugin => plugin instanceof optimize.CommonsChunkPlugin)
      expect(commons.length).equal(0)
    })

    it('should have the UglifyJsPlugin enabled while distributing', function () {
      config = configureBuilder({ projectPath, saguiPath, buildTarget: 'dist' }).webpackConfig

      const commons = config.plugins.filter(plugin => plugin instanceof optimize.UglifyJsPlugin)
      expect(commons.length).equal(1)
    })

    it('should have the HotModuleReplacementPlugin enabled while developing', function () {
      config = configureBuilder({ projectPath, saguiPath, buildTarget: 'develop' }).webpackConfig

      const commons = config.plugins.filter(plugin => plugin instanceof HotModuleReplacementPlugin)
      expect(commons.length).equal(1)
    })
  })

  describe('pages', function () {
    describe('default', function () {
      beforeEach(function () {
        config = configureBuilder({ projectPath, saguiPath }).webpackConfig
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

    describe('custom', function () {
      const pages = ['index', 'demo']

      beforeEach(function () {
        config = configureBuilder({ projectPath, saguiPath, pages }).webpackConfig
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
})
