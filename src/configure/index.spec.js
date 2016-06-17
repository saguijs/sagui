import { expect } from 'chai'
import configure from './index'

describe('configure', function () {
  const saguiOptions = {
    saguiPath: '.',
    projectPath: '.'
  }

  it('should configure webpack', () => {
    const webpack = configure(saguiOptions).webpack()
    expect(webpack.length).to.equal(1)
  })

  it('should configure karma', () => {
    const karma = configure(saguiOptions).karma()
    expect(typeof karma === 'function').to.equal(true)
  })
})
