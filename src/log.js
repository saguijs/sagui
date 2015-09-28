import chalk from 'chalk';


const errorStyle = chalk.bold.red;
const warningStyle = chalk.yellow;


export function logError (entry) {
  console.log(errorStyle(entry));
}


export function logWarning (entry) {
  console.log(warningStyle(entry));
}
