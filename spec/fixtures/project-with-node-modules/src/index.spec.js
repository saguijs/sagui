import MyProject from '.'

describe('transient dependencies', function() {
  it('should get different versions of the same transient dependencies', function() {
    expect(MyProject.dependencyA()).toEqual('nested-dependency')
    expect(MyProject.dependencyB()).toEqual('root-dependency')
  })

  it('should get the node_modules file when requiring without absolute path', function() {
    expect(MyProject.overwrittenByNodeModules()).toEqual('node-module')
  })
})
