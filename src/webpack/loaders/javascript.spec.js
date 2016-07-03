import { HotModuleReplacementPlugin } from 'webpack'
import path from 'path'
import reactTransform from 'babel-plugin-react-transform'
import { expect } from 'chai'
import loader from './javascript'
import fileExtensions from '../../file-extensions'
import actions from '../../actions'

describe('javaScript', () => {
  const projectPath = '/tmp/test-project'

  it('should only build files inside the src folder by default', () => {
    const webpack = loader.configure({ projectPath })
    expect(webpack.module.loaders[0].include).to.eql([path.join(projectPath, 'src')])
  })

  it('should include the user defined dependencies to be built', () => {
    const config = {
      projectPath,
      javaScript: {
        transpileDependencies: [
          // an example project
          'ui-react-components'
        ]
      }
    }

    const webpack = loader.configure(config)
    expect(webpack.module.loaders[0].include).to.eql([
      path.join(projectPath, 'src'),
      path.join(projectPath, 'node_modules', 'ui-react-components')
    ])
  })

  it(`should resolve JavaScript files (${fileExtensions.list.JAVASCRIPT})`, function () {
    const webpack = loader.configure({ projectPath })
    expect(webpack.resolve.extensions).to.eql(fileExtensions.list.JAVASCRIPT)
  })

  describe('HMR', () => {
    it('should not setup any babel plugin by default', () => {
      const webpack = loader.configure({ projectPath })
      expect(webpack.babel.env).to.eql({})
    })

    it('should not setup any webpack plugin by default', () => {
      const webpack = loader.configure({ projectPath })
      expect(webpack.plugins).to.eql([])
    })

    it('should setup react transform babel plugin if action is develop', () => {
      const webpack = loader.configure({ projectPath, action: actions.DEVELOP })
      expect(webpack.babel.env.development.plugins[0][0]).to.equal(reactTransform)
    })

    it('should setup the HotModuleReplacementPlugin if action is develop', () => {
      const webpack = loader.configure({ projectPath, action: actions.DEVELOP })

      const plugins = webpack.plugins.filter((plugin) => plugin instanceof HotModuleReplacementPlugin)
      expect(plugins.length).equal(1)
    })
  })
})
