import { join } from 'path'
import { expect } from 'chai'
import presets from './index'
import fileExtensions from '../../../file-extensions'

const saguiPath = join(__dirname, '../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

describe('webpack presets', function () {
  let config

  describe('webpackConfig extension', function () {
    it('should allow extending the default configuration', function () {
      const webpack = {
        target: 'electron'
      }

      config = presets({ projectPath, saguiPath, webpack })
      expect(config.target).equal('electron')
    })

    it('should allow overwriting the default configuration', function () {
      const defaultConfig = presets({ projectPath, saguiPath })
      expect(defaultConfig.devtool).equal('source-map')

      const webpack = {
        devtool: 'cheap-source-map'
      }

      config = presets({ projectPath, saguiPath, webpack })
      expect(config.devtool).equal('cheap-source-map')
    })

    it('should allow changing a loader based on the test (webpack-merge feature)', function () {
      // disable the default exclude behavior of Babel
      const webpack = {
        module: {
          loaders: [
            {
              test: fileExtensions.JAVASCRIPT,
              loader: 'babel'
            }
          ]
        }
      }

      config = presets({ projectPath, saguiPath, webpack })
      const loaders = config.module.loaders.filter((loader) => loader.loader === 'babel')

      // should change the existing loader, not add another
      expect(loaders.length).equal(1)

      // should remove the exclude attribute as requested
      expect(loaders[0].exclude).undefined
    })
  })
})
