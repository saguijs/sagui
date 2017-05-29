import prettier from 'prettier'
import chalk from 'chalk'
import glob from 'glob'
import path from 'path'
import fs from 'fs'
import { log } from '../util/log'
import eslintConfig from '../javascript-eslintrc.json'

const prettierOptions = eslintConfig.rules['prettify/prettier'][1]

export default saguiConfig =>
  new Promise((resolve, reject) => {
    log('Formatting files...')
    glob(path.join(saguiConfig.projectPath, 'src/**/*.js'), (error, files) => {
      if (error) {
        return reject(error)
      }

      try {
        const formatted = files
          .map(file => {
            const original = fs.readFileSync(file).toString()
            const formatted = prettier.format(original, prettierOptions)

            return [file, original, formatted]
          })
          .filter(([file, original, formatted]) => {
            const changed = original.indexOf(formatted)
            const color = changed ? chalk.green : chalk.dim

            console.log(color(file.replace(`${saguiConfig.projectPath}`, '')))
            return changed
          })

        formatted.forEach(([file, original, formatted]) => fs.writeFileSync(file, formatted))

        log(`Formatted ${formatted.length} files.`)
      } catch (error) {
        return reject(error)
      }

      resolve()
    })
  })
