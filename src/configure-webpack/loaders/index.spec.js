import { join } from 'path'
import { expect } from 'chai'
import buildLoadersConfig from './index'

const saguiPath = join(__dirname, '../../../../')
const projectPath = join(saguiPath, 'spec/fixtures/simple-project')

const baseSaguiConfig = {
  saguiPath,
  projectPath,
  pages: ['index'],
}

describe('buildLoadersConfig', function() {
  it('should allow disabling all loaders', () => {
    const saguiConfig = {
      ...baseSaguiConfig,
      disableLoaders: [
        'font',
        'html',
        'image',
        'javaScript',
        'json',
        'style',
        'txt',
        'video',
        'yaml',
      ],
    }

    const config = buildLoadersConfig(saguiConfig)
    expect(config).to.eql({})
  })
})
