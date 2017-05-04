import MyProject from '.'

describe('super test', function() {
  it('should work', function() {
    expect(new MyProject().say()).toEqual('batata frita')
  })
})
