import json from '../json'


export default function install ({ packagePath }) {
  const content = json.read(packagePath)
  Object.assign(content.scripts, defaultScripts)
  json.write(packagePath, content)
}


const defaultScripts = {
  'sagui:test': 'sagui test',
  'sagui:test-watch': 'sagui test --watch',
  'sagui:develop': 'sagui develop',
  'sagui:build': 'sagui build',
  'sagui:dist': 'sagui dist'
}
