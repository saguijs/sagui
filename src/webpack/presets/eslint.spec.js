import { expect } from 'chai'
import path from 'path'
import preset from './eslint'
import actions from '../../actions'

describe('eslint webpack preset', function () {
  it('should point to a project eslintrc file', () => {
    const projectPath = 'a/demo/path'
    const action = actions.BUILD
    const webpackConfig = preset.configure({ action, projectPath })
    const webpackLoader = webpackConfig.module.rules.find((loader) => loader.loader === 'eslint-loader')

    expect(webpackLoader.options.configFile).to.eql(path.join(projectPath, '.eslintrc'))
  })
})
