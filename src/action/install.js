import { readFileSync, writeFileSync } from 'fs'


export default function install ({ packagePath }) {
  const content = read(packagePath)
  Object.assign(content.scripts, defaultScripts)
  write(packagePath, content)
}


function read (packagePath) {
  const blob = readFileSync(packagePath)
  return JSON.parse(blob)
}


function write (packagePath, content) {
  writeFileSync(packagePath,
                JSON.stringify(content, null, 2))
}


const defaultScripts = {
  'sagui:test': 'sagui test',
  'sagui:test-watch': 'sagui test --watch',
  'sagui:develop': 'sagui develop',
  'sagui:build': 'sagui build',
  'sagui:dist': 'sagui dist'
}
