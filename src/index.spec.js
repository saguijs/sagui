import { expect } from 'chai'
import packageJSON from '../package.json'

describe('sagui', function () {
  // wee need the karma and webpack cli accessibles for example
  it('should have the same dependencies and peerDependencies (NPM v2 support)', () => {
    expect(packageJSON.dependencies).to.eql(packageJSON.peerDependencies)
  })
})
