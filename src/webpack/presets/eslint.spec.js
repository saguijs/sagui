import { expect } from 'chai'
import preset from './eslint'
import actions from '../../actions'

describe('eslint webpack preset', function () {
  describe('when watch is enabled', () => {
    it('should set "no-debugger" rule to 0', function () {
      const projectPath = 'a/demo/path'
      const config = preset.configure({ watch: true, projectPath })

      expect(config.eslint.rules['no-debugger']).to.eql(0)
    })
  })
  describe('when action is "develop"', () => {
    it('should set "no-debugger" rule to 0', function () {
      const projectPath = 'a/demo/path'
      const action = actions.DEVELOP
      const config = preset.configure({ action, projectPath })

      expect(config.eslint.rules['no-debugger']).to.eql(0)
    })
  })
  describe('when action is not "develop"', () => {
    it('should not set any rules', () => {
      const projectPath = 'a/demo/path'
      const action = actions.BUILD
      const config = preset.configure({ action, projectPath })

      expect(config.eslint.rules).to.eql({})
    })
  })
})
