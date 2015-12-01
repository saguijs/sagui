import { expect } from 'chai'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import buildWebpackConfig from './build-webpack-config'

const projectPath = ''
const saguiPath = ''

describe('build webpack config', function () {
  let config

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
