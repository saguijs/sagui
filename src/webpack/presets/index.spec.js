import { join } from 'path'
import { expect } from 'chai'
import configure from './index'

const saguiPath = join(__dirname, '../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

describe('configure', function () {
  let config

  describe('disabling presets', function () {
    beforeEach(function () {
      const disabledSaguiPresets = ['json']
      config = configure({ projectPath, saguiPath, disabledSaguiPresets })
    })

    it('should disable the specified presets', function () {
      const loader = config.module.loaders.find((loader) => loader.loader === 'json-loader')
      expect(loader).eql(undefined)
    })
  })

  describe('webpackConfig extension', function () {
    it('should allow extending the default configuration', function () {
      const webpackConfig = {
        target: 'electron'
      }

      config = configure({ projectPath, saguiPath }, webpackConfig)

      expect(config.target).equal('electron')
    })

    it('should allow overwriting the default configuration', function () {
      const defaultConfig = configure({ projectPath, saguiPath }, webpackConfig)
      expect(defaultConfig.devtool).equal('source-map')

      const webpackConfig = {
        devtool: 'cheap-source-map'
      }

      config = configure({ projectPath, saguiPath }, webpackConfig)
      expect(config.devtool).equal('cheap-source-map')
    })

    it('should allow changing a loader based on the test (webpack-merge feature)', function () {
      // disable the default exclude behavior of Babel
      const webpackConfig = {
        module: {
          loaders: [
            {
              test: /\.(jsx?|es6)$/,
              loader: 'babel'
            }
          ]
        }
      }

      config = configure({ projectPath, saguiPath }, webpackConfig)
      const loaders = config.module.loaders.filter((loader) => loader.loader === 'babel')

      // should change the existing loader, not add another
      expect(loaders.length).equal(1)

      // should remove the exclude attribute as requested
      expect(loaders[0].exclude).undefined
    })
  })
})
