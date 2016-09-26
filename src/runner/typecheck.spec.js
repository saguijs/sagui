import flow from 'flow-bin'
import { notEqual } from 'assert'

describe('typecheck', () => {
  it('should have a path for flow-bin', () => {
    console.log(flow)
    notEqual(flow, null)
  })
})
