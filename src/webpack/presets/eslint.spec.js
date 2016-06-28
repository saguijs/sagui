import { expect } from 'chai'
import preset from './eslint'

describe('eslint webpack preset', function () {
  describe('when action is "develop"', () => {
    it('should set "no-debugger" rule to 0', function () {
      const projectPath = 'a/demo/path'
      const action = 'develop'
      const config = preset.configure({ action, projectPath })

      expect(config.eslint.rules['no-debugger']).to.eql(0)
    })
  })
  describe('when action is not "develop"', () => {
    it('should not set any rules', () => {
      const projectPath = 'a/demo/path'
      const action = 'build'
      const config = preset.configure({ action, projectPath })

      expect(config.eslint.rules).to.eql({})
    })
  })
})
