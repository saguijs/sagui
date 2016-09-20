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
    'sagui develop --port 3000'
  ],
  'dist': [
    'NODE_ENV=production sagui build --optimize',
    'cross-env NODE_ENV=production sagui build --optimize'
  ],
  'start': [
    'npm run develop'
  ],
  'test': [
    'echo "Error: no test specified" && exit 1',
    'npm run test:lint && npm run test:unit',
    'npm run test:lint && npm run test:typecheck && npm run test:unit'
  ],
  'test:coverage': [
    'npm run test:unit -- --coverage'
  ],
  'test:lint': [
    'sagui lint'
  ],
  'test:typecheck': [
    'sagui typecheck'
  ],
  'test:unit': [
    'NODE_ENV=test sagui test',
    'cross-env NODE_ENV=test sagui test'
  ],
  'test:unit:watch': [
    'npm run test:unit -- --watch'
  ]
}

export default function (scripts = {}) {
  return Object.keys(saguiScripts).reduce((scripts, key) => {
    if (!scripts[key] || saguiScripts[key].indexOf(scripts[key]) !== -1) {
      scripts[key] = saguiScripts[key][saguiScripts[key].length - 1]
    }

    return scripts
  }, scripts)
}
