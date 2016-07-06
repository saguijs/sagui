import { expect } from 'chai'
import loader from './style'
import actions from '../../actions'

describe('style', function () {
  const projectPath = '/tmp/test-project'

  it('should have css modules enabled by default', () => {
    const config = loader.configure({ projectPath })

    expect(config.module.loaders[0].loader.includes('css?modules')).to.eql(true)
    expect(config.module.loaders[1].loader.includes('css?modules')).to.eql(true)
  })

  it('should be possible to disable css modules', () => {
    const config = loader.configure({ projectPath, style: { cssModules: false } })

    expect(config.module.loaders[0].loader.includes('css?modules')).to.eql(false)
    expect(config.module.loaders[1].loader.includes('css?modules')).to.eql(false)
  })

  it('should have source maps enabled by default', () => {
    const config = loader.configure({ projectPath })

    expect(config.module.loaders[0].loader.includes('sourceMap')).to.eql(true)
    expect(config.module.loaders[1].loader.includes('sourceMap')).to.eql(true)
  })

  it('should be possible to disable source maps', () => {
    const config = loader.configure({ projectPath, style: { sourceMaps: false } })

    expect(config.module.loaders[0].loader.includes('sourceMap')).to.eql(false)
    expect(config.module.loaders[1].loader.includes('sourceMap')).to.eql(false)
  })

  describe('extract text webpack plugin', () => {
    it('should be disabled by default', () => {
      const config = loader.configure({ projectPath })

      expect(config.module.loaders[0].loader.includes('extract-text-webpack-plugin')).to.eql(false)
      expect(config.module.loaders[1].loader.includes('extract-text-webpack-plugin')).to.eql(false)
    })

    it('should be disabled on building NOT pages', () => {
      const config = loader.configure({ projectPath, action: actions.BUILD })

      expect(config.module.loaders[0].loader.includes('extract-text-webpack-plugin')).to.eql(false)
      expect(config.module.loaders[1].loader.includes('extract-text-webpack-plugin')).to.eql(false)
    })

    it('should be enabled on building pages', () => {
      const config = loader.configure({ projectPath, action: actions.BUILD, pages: ['index'] })

      expect(config.module.loaders[0].loader.includes('extract-text-webpack-plugin')).to.eql(true)
      expect(config.module.loaders[1].loader.includes('extract-text-webpack-plugin')).to.eql(true)
    })

    it('should be possible to disable it even when it should be enabled on building pages', () => {
      const config = loader.configure({ projectPath, action: actions.BUILD, pages: ['index'], style: { extract: false } })

      expect(config.module.loaders[0].loader.includes('extract-text-webpack-plugin')).to.eql(false)
      expect(config.module.loaders[1].loader.includes('extract-text-webpack-plugin')).to.eql(false)
    })
  })
})

