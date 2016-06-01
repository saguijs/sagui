import { expect } from 'chai'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import plugin from './clean'

describe('clean', function () {
  it('should configure CleanWebpackPlugin', function () {
    const projectPath = 'a/demo/path'
    const config = plugin.configure({ projectPath })

    const commons = config.plugins.filter((plugin) => plugin instanceof CleanWebpackPlugin)
    expect(commons.length).equal(1)

    const cleanWebpackPlugin = commons[0]
    expect(cleanWebpackPlugin.paths).to.eql(['build'])
    expect(cleanWebpackPlugin.options.verbose).to.eql(false)
    expect(cleanWebpackPlugin.options.root).to.eql(projectPath)
  })
})
