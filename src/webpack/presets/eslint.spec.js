import { expect } from 'chai'
import path from 'path'
import preset from './eslint'
import actions from '../../actions'

describe('eslint webpack preset', function () {
  it('should point to a project eslintrc file', () => {
    const projectPath = 'a/demo/path'
    const action = actions.BUILD
    const config = preset.configure({ action, projectPath })

    expect(config.eslint.configFile).to.eql(path.join(projectPath, '.eslintrc'))
  })
})
