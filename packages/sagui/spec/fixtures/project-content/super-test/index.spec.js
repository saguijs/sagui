import superTest, { Whatever } from '.'

describe('test-project', function () {
  it('should transpile Babel code', () => {
    expect(new Whatever().print()).toEqual('hurray!')
  })

  it('should import yaml files', () => {
    expect(superTest.data).toEqual({
      stuff: ['batata', 'macaco']
    })
  })

  it('should support CSS Modules', () => {
    expect(superTest.cssClassName).toEqual('super-test-component-3dg8T')
  })

  it('should support sass CSS Modules', () => {
    expect(superTest.scssClassName).toEqual('super-test-component-3wrmH')
  })
})
