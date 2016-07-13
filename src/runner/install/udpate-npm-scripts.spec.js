import { expect } from 'chai'
import updateNpmScripts from './update-npm-scripts'

describe('updateNpmScripts', function () {
  describe('given an new npm project scripts', () => {
    it('should add all the Sagui scripts', () => {
      const scripts = {
        'test': 'echo "Error: no test specified" && exit 1'
      }

      const saguiScripts = updateNpmScripts(scripts)
      expect(saguiScripts).to.eql({
        'build': 'sagui build',
        'develop': 'sagui develop --port 3000',
        'dist': 'cross-env NODE_ENV=production sagui build --optimize',
        'start': 'npm run develop',
        'test': 'npm run test:lint && npm run test:unit',
        'test:coverage': 'npm run test:unit -- --coverage',
        'test:lint': 'sagui lint',
        'test:unit': 'cross-env NODE_ENV=test sagui test',
        'test:unit:watch': 'npm run test:unit -- --watch'
      })
    })
  })
})
