#!/usr/bin/env node
var path = require('path')
var saguiPath = path.join(__dirname, '..')

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

if (process.env.TEST_TYPE === 'test_create_project') {
  // # builds Sagui before installing
  exec('npm run build', saguiPath)

  var projectPath = createTempFolder()

  // # Create a new project and install Sagui
  exec('npm init -y .', projectPath)
  exec('npm install --save-dev file://' + saguiPath, projectPath)

  // # Run some basic scripts
  exec('npm test', projectPath)
  exec('npm run build', projectPath)
  exec('npm run dist', projectPath)
  exec('npm run test:coverage', projectPath)
}

