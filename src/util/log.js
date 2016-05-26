import chalk from 'chalk'

const errorStyle = chalk.bold.red
const warningStyle = chalk.yellow

export function logError (entry) {
  console.log(sagui(), errorStyle(entry))
}

export function logWarning (entry) {
  console.log(sagui(), warningStyle(entry))
}

export function log (entry) {
  console.log(sagui(), entry)
}

function sagui () {
  return chalk.dim('🐵  Sagui')
}
