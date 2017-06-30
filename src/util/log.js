import chalk from 'chalk'

const errorStyle = chalk.bold.red
const warningStyle = chalk.yellow

export function logError(entry) {
  console.log(sagui(), errorStyle(entry))
}

export function logWarning(entry) {
  console.log(sagui(), warningStyle(entry))
}

export function log(entry) {
  console.log(sagui(), entry)
}

export function logContent(entry) {
  console.log(entry.split('\n').map(line => `${sagui()} ${line}`).join('\n'))
}

function sagui() {
  return process.platform === 'win32' ? 'Sagui -' : chalk.dim('🐵  Sagui')
}
