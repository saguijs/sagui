import { join } from 'path'
import mkdirp from 'mkdirp'
import { readFileSync, writeFileSync } from 'fs'
import json from '../../util/json'


export default function install (projectPath) {
  updatePackageJSON(projectPath)
  createSrcFolder(projectPath)
  createIndexHtml(projectPath)
  createEslintrc(projectPath)
}


const defaultScripts = {
  'sagui:test': 'sagui test',
  'sagui:test-watch': 'sagui test --watch',
  'sagui:develop': 'sagui develop',
  'sagui:build': 'sagui build',
  'sagui:dist': 'sagui dist'
}


function updatePackageJSON (projectPath) {
  const packagePath = join(projectPath, 'package.json')
  const content = json.read(packagePath)
  Object.assign(content.scripts, defaultScripts)
  json.write(packagePath, content)
}


function createSrcFolder (projectPath) {
  const srcPath = join(projectPath, '/src')
  mkdirp.sync(srcPath)
}


function createIndexHtml (projectPath) {
  const source = join(__dirname, '/templates/index.html')
  const target = join(projectPath, '/src/index.html')
  cp(source, target)
}


function createEslintrc (projectPath) {
  const source = join(__dirname, '/templates/eslintrc')
  const target = join(projectPath, '/.eslintrc')
  cp(source, target)
}


function cp (source, target) {
  var content = readFileSync(source)
  writeFileSync(target, content.toString())
}
