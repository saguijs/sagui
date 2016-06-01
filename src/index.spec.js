import { expect } from 'chai'
import sagui from './index'
import packageJSON from '../package.json'

describe('sagui', function () {
  it('should configure webpack', () => {
    const webpack = sagui().webpack({
      sagui: {
        pages: ['index']
      }
    })

    expect(webpack.length).to.equal(1)
  })

  it('should configure karma', () => {
    const webpack = sagui().webpack({
      sagui: {
        pages: ['index']
      }
    })

    const karma = sagui().karma({}, webpack)
    expect(typeof karma === 'function').to.equal(true)
  })

  // wee need the karma and webpack cli accessibles for example
  it.skip('should have the same dependencies and peerDependencies (NPM v2 support)', () => {
    expect(packageJSON.dependencies).to.eql(packageJSON.peerDependencies)
  })
})
