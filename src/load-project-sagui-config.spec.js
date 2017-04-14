import { validateConfig } from './load-project-sagui-config'

describe('load-project-sagui-config', () => {
  describe('validateConfig', () => {
    it('pages', () => {
      validateConfig({
        pages: ['testing']
      })
    })

    it('libraries as strings', () => {
      validateConfig({
        libraries: ['button']
      })
    })

    it('libraries as objects', () => {
      validateConfig({
        libraries: [
          'button',
          {
            main: 'button',
            umdName: 'MyUIButton'
          }
        ]
      })
    })

    it('style.cssModules', () => {
      validateConfig({
        style: {
          cssModules: false
        }
      })
    })

    it('style.sourceMaps', () => {
      validateConfig({
        style: {
          sourceMaps: false
        }
      })
    })

    it('style.extract', () => {
      validateConfig({
        style: {
          extract: false
        }
      })
    })

    it('javaScript.transpileDependencies', () => {
      validateConfig({
        javaScript: {
          transpileDependencies: ['ui']
        }
      })
    })

    it('javaScript.typeCheckAll', () => {
      validateConfig({
        javaScript: {
          typeCheckAll: true
        }
      })
    })

    it('develop.proxy', () => {
      validateConfig({
        develop: {
          proxy: {
            '/some/path*': {
              target: 'https://other-server.example.com',
              secure: false
            }
          }
        }
      })
    })

    it('additionalWebpackConfig', () => {
      validateConfig({
        additionalWebpackConfig: {
          plugins: []
        }
      })
    })

    it('additionalKarmaConfig', () => {
      validateConfig({
        additionalKarmaConfig: {
          browsers: ['Chrome']
        }
      })
    })

    it('disableLoaders', () => {
      validateConfig({
        disableLoaders: [
          'font',
          'image',
          'javaScript',
          'style',
          'txt',
          'video',
          'yaml'
        ]
      })
    })
  })
})
