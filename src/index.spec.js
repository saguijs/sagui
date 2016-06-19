import { expect } from 'chai'
import packageJSON from '../package.json'
import sagui from '.'

describe('sagui', function () {
  // wee need the karma and webpack cli accessibles for example
  it('should have the same dependencies and peerDependencies (NPM v2 support)', () => {
    expect(packageJSON.dependencies).to.eql(packageJSON.peerDependencies)
  })

  const saguiOptions = {
    saguiPath: '.',
    projectPath: '.'
  }

  it('should configure webpack', () => {
    const webpack = sagui(saguiOptions).webpack
    expect(webpack.length).to.equal(1)
  })

  it('should configure karma', () => {
    const karma = sagui(saguiOptions).karma
    expect(karma.webpack).to.exist
  })
})
