// example taken from http://babeljs.io/docs/plugins/transform-object-rest-spread/

const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }

const n = { x, y, ...z }

export default {
  x, y, z, n
}
