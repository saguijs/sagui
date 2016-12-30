import { expect } from 'chai'
import updateNpmScripts from './update-npm-scripts'

const CURRENT_SCRIPTS = {
  'build': 'sagui build',
  'dist': 'sagui dist',
  'start': 'sagui develop --port 3000',
  'test': 'npm run test:lint && npm run test:typecheck && npm run test:unit',
  'test:lint': 'sagui test:lint',
  'test:typecheck': 'sagui test:typecheck',
  'test:unit': 'sagui test:unit --coverage',
  'test:unit:watch': 'sagui test:unit --watch'
}

describe('updateNpmScripts', function () {
  describe('given an new npm project scripts', () => {
    it('should add all the Sagui scripts overwriting the default test script', () => {
      const scripts = {
        'test': 'echo "Error: no test specified" && exit 1'
      }

      const saguiScripts = updateNpmScripts(scripts)
      expect(saguiScripts).to.eql(CURRENT_SCRIPTS)
    })

    it('should add all the Sagui scripts even if no scripts are specified', () => {
      const saguiScripts = updateNpmScripts()
      expect(saguiScripts).to.eql(CURRENT_SCRIPTS)
    })
  })

  describe('existing projects', () => {
    it('should update old `test:unit` scripts', () => {
      const scripts = {
        'test:unit': 'NODE_ENV=test sagui test'
      }

      const saguiScripts = updateNpmScripts(scripts)
      expect(saguiScripts['test:unit']).to.eql(CURRENT_SCRIPTS['test:unit'])
    })

    it('should update old `dist` scripts', () => {
      const scripts = {
        'dist': 'NODE_ENV=production sagui build --optimize'
      }

      const saguiScripts = updateNpmScripts(scripts)
      expect(saguiScripts['dist']).to.eql(CURRENT_SCRIPTS['dist'])
    })

    it('should remove undefined scripts if it matches previous versions', () => {
      const scripts = {
        'develop': 'sagui develop --port 3000',
        'test:coverage': 'npm run test:unit -- --coverage'
      }

      const saguiScripts = updateNpmScripts(scripts)

      const expectedScripts = [
        'build',
        'dist',
        'start',
        'test',
        'test:lint',
        'test:typecheck',
        'test:unit',
        'test:unit:watch'
      ]

      expect(Object.keys(saguiScripts)).to.eql(expectedScripts)
    })

    it('should NOT remove undefined scripts if it was modified by the user', () => {
      const scripts = {
        'test:coverage': 'npm run test:unit'
      }

      const saguiScripts = updateNpmScripts(scripts)

      const expectedScripts = [
        'build',
        'dist',
        'start',
        'test',
        'test:coverage',
        'test:lint',
        'test:typecheck',
        'test:unit',
        'test:unit:watch'
      ]

      expect(Object.keys(saguiScripts)).to.eql(expectedScripts)
      expect(saguiScripts['test:coverage']).to.eql('npm run test:unit')
    })

    it('should NOT remove or change custom scripts while keeping them SORTED', () => {
      const scripts = {
        'my-weird-script': 'do whatever'
      }

      const saguiScripts = updateNpmScripts(scripts)

      const expectedScripts = [
        'build',
        'dist',
        'my-weird-script',
        'start',
        'test',
        'test:lint',
        'test:typecheck',
        'test:unit',
        'test:unit:watch'
      ]

      expect(Object.keys(saguiScripts)).to.eql(expectedScripts)
      expect(saguiScripts['my-weird-script']).to.eql('do whatever')
    })
  })
})
