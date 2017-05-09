#!/usr/bin/env node
var path = require('path')
var saguiPath = path.join(__dirname, '..')

console.log('ENVIRONMENT', process.env)

function exec (command, cwd) {
  // pass the parent´s stdio to the child process
  // http://stackoverflow.com/a/31104898
  require('child_process').execSync(command, { cwd: cwd, stdio: [0, 1, 2] })
}

function createTempFolder () {
  return require('tmp').dirSync().name
}

if (process.env.TEST_TYPE === 'lint_and_test_unit') {
  exec('npm run test:lint', saguiPath)
  exec('npm run test:unit', saguiPath)
}

if (process.env.TEST_TYPE === 'integration_test') {
  exec('npm run test:integration', saguiPath)
}

if (process.env.TEST_TYPE === 'test_create_project_npm') {
  // # builds Sagui before installing
  exec('npm run build', saguiPath)

  var npmProjectPath = createTempFolder()

  // # Create a new project and install Sagui
  exec('npm init -y .', npmProjectPath)
  exec('npm install --save-dev file://' + saguiPath, npmProjectPath)

  // # Run some basic scripts
  exec('npm test', npmProjectPath)
  exec('npm run build', npmProjectPath)
  exec('npm run dist', npmProjectPath)
  exec('npm run format', npmProjectPath)
}

if (process.env.TEST_TYPE === 'test_create_project_yarn') {
  // # builds Sagui before installing
  exec('npm run build', saguiPath)

  var yarnProjectPath = createTempFolder()

  // # Create a new project and install Sagui
  exec('yarn init -y .', yarnProjectPath)
  exec('yarn add --dev file://' + saguiPath, yarnProjectPath)

  // # Run some basic scripts
  exec('yarn test', yarnProjectPath)
  exec('yarn run build', yarnProjectPath)
  exec('yarn run dist', yarnProjectPath)
  exec('yarn run format', npmProjectPath)
}
