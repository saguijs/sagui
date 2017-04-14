import objectRest from './object-rest'

describe('super test', function () {
  it('should work', function () {
    expect(objectRest).toEqual({
      x: 1,
      y: 2,
      z: { a: 3, b: 4 },
      n: { x: 1, y: 2, a: 3, b: 4 }
    })
  })
})
