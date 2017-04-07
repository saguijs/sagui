import path from 'path'
import { expect } from 'chai'
import loader from './javascript'

describe('javaScript', () => {
  const projectPath = '/tmp/test-project'

  it('should lint the code by using a project eslintrc file', () => {
    const projectPath = 'a/demo/path'
    const webpack = loader.configure({ projectPath })

    expect(webpack.module.rules[0].loader).to.eql('eslint-loader')
    expect(webpack.module.rules[0].enforce).to.eql('pre')
    expect(webpack.module.rules[0].options.configFile).to.eql(path.join(projectPath, '.eslintrc'))
  })

  it('should only build files inside the src folder by default', () => {
    const webpack = loader.configure({ projectPath })
    expect(webpack.module.rules[1].include).to.eql([path.join(projectPath, 'src')])
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
    expect(webpack.module.rules[1].include).to.eql([
      path.join(projectPath, 'src'),
      path.join(projectPath, 'node_modules', 'ui-react-components')
    ])
  })
})
