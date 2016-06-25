import { expect } from 'chai'
import preset from './babel'

describe('babel', () => {
  const projectPath = '/tmp/test-project'

  it('should only build files inside the src folder by default', () => {
    const webpack = preset.configure({ projectPath })
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

    const webpack = preset.configure(config)
    expect(webpack.module.loaders[0].include).to.eql([
      '/tmp/test-project/src',
      '/tmp/test-project/node_modules/ui-react-components'
    ])
  })
})
