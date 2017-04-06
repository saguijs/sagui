import { expect } from 'chai'
import { join } from 'path'
import karma from '.'

const saguiPath = join(__dirname, '../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

const baseSaguiConfig = {
  saguiPath,
  projectPath,
  pages: ['index'],
  webpack: ['first', 'seccond']
}

describe('karma', function () {
  it('should the first availbale webpackConfig from the webpackConfig array to prevent double test execution', function () {
    expect(karma(baseSaguiConfig).webpack).equal('first')
  })

  describe('extension', function () {
    it('should allow overwriting the default configuration', function () {
      expect(karma(baseSaguiConfig).browsers).eql(['PhantomJS'])
      expect(karma({ ...baseSaguiConfig, karma: { browsers: ['Chrome'] } }).browsers).eql(['Chrome'])
    })
  })
})
