import { expect } from 'chai'
import loader from './javascript'

describe('javaScript', () => {
  const projectPath = '/tmp/test-project'

  it('should only build files inside the src folder by default', () => {
    const webpack = loader.configure({ projectPath })
    expect(webpack.module.loaders[0].include).to.eql(['/tmp/test-project/src'])
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
      '/tmp/test-project/src',
      '/tmp/test-project/node_modules/ui-react-components'
    ])
  })
})
