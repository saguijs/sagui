/**
 * List of scripts that provide an upgrade path
 * Each "script key" has a list of all past and
 * current value for the script.
 *
 * If we need to update a script, simply append to the end
 * of the list.
 */
const saguiScripts = {
  'build': [
    'sagui build'
  ],
  'develop': [
    'sagui develop --port 3000',
    undefined
  ],
  'dist': [
    'NODE_ENV=production sagui build --optimize',
    'cross-env NODE_ENV=production sagui build --optimize',
    'sagui build --optimize'
  ],
  'start': [
    'npm run develop',
    'sagui develop --port 3000'
  ],
  'test': [
    'echo "Error: no test specified" && exit 1',
    'npm run test:lint && npm run test:unit',
    'npm run test:lint && npm run test:typecheck && npm run test:unit'
  ],
  'test:coverage': [
    'npm run test:unit -- --coverage',
    undefined
  ],
  'test:lint': [
    'sagui lint',
    'sagui test:lint'
  ],
  'test:typecheck': [
    'sagui typecheck',
    'sagui test:typecheck'
  ],
  'test:unit': [
    'NODE_ENV=test sagui test',
    'cross-env NODE_ENV=test sagui test',
    'cross-env NODE_ENV=test sagui test:unit',
    'sagui test:unit',
    'sagui test:unit --coverage'
  ],
  'test:unit:watch': [
    'npm run test:unit -- --watch',
    'cross-env NODE_ENV=test sagui test:unit --watch',
    'sagui test:unit --watch'
  ]
}

export default function (scripts = {}) {
  return Object.keys(saguiScripts).reduce((newScripts, key) => {
    if ((!scripts[key] || saguiScripts[key].indexOf(scripts[key]) !== -1) &&
        saguiScripts[key][saguiScripts[key].length - 1] !== undefined) {
      newScripts[key] = saguiScripts[key][saguiScripts[key].length - 1]
    }

    return newScripts
  }, {})
}
