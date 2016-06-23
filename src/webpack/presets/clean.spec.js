import { expect } from 'chai'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import preset from './clean'

describe('clean webpack preset', function () {
  it('should configure CleanWebpackPlugin', function () {
    const projectPath = 'a/demo/path'
    const config = preset.configure({ projectPath })

    const commons = config.plugins.filter((preset) => preset instanceof CleanWebpackPlugin)
    expect(commons.length).equal(1)

    const cleanWebpackPlugin = commons[0]
    expect(cleanWebpackPlugin.paths).to.eql(['dist'])
    expect(cleanWebpackPlugin.options.verbose).to.eql(false)
    expect(cleanWebpackPlugin.options.root).to.eql(projectPath)
  })
})
