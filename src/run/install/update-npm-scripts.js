import uniq from 'lodash.uniq'

/**
 * List of scripts that provide an upgrade path
 * Each "script key" has a list of all past and
 * current value for the script.
 *
 * If we need to update a script, simply append to the end
 * of the list.
 */
const saguiScripts = {
  'format': [
    'sagui format',
  ],
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
    'sagui build --optimize',
    'sagui dist'
  ],
  'start': [
    'npm run develop',
    'sagui develop --port 3000'
  ],
  'test': [
    'echo "Error: no test specified" && exit 1',
    'npm run test:lint && npm run test:unit',
    'npm run test:lint && npm run test:typecheck && npm run test:unit',
    'sagui test'
  ],
  'test:coverage': [
    'npm run test:unit -- --coverage',
    undefined
  ],
  'test:lint': [
    'sagui lint',
    'sagui test:lint',
    undefined
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

export default function (userScripts = {}) {
  const combinedScripts = uniq([
    ...Object.keys(saguiScripts),
    ...Object.keys(userScripts)
  ]).sort()

  return combinedScripts.reduce((scripts, key) => {
    const isCustomScript = !saguiScripts[key]

    if (isCustomScript) {
      return { ...scripts, [key]: userScripts[key] }
    }

    const isMissingScript = !userScripts[key]
    const hasAnOutdatedScript = saguiScripts[key].indexOf(userScripts[key]) !== -1
    const latestScript = saguiScripts[key][saguiScripts[key].length - 1]
    const latestScriptIsDefined = latestScript !== undefined

    if ((hasAnOutdatedScript && latestScriptIsDefined) || (isMissingScript && latestScriptIsDefined)) {
      return { ...scripts, [key]: latestScript }
    }

    if (!hasAnOutdatedScript && !isMissingScript) {
      return { ...scripts, [key]: userScripts[key] }
    }

    return scripts
  }, {})
}
