import prettier from 'prettier'
import chalk from 'chalk'
import glob from 'glob'
import path from 'path'
import fs from 'fs'
import { log } from '../util/log'
import eslintConfig from '../javascript-eslintrc.json'

const getPrettierOptions = (config) => {
  const prettierRulesKey = 'prettier/prettier'
  if (
    config.rules &&
    Array.isArray(config.rules[prettierRulesKey]) &&
    config.rules[prettierRulesKey][1]
  ) {
    return { ...config.rules[prettierRulesKey][1] }
  } else {
    return null
  }
}

let defaultPrettierOptions = getPrettierOptions(eslintConfig)

export default saguiConfig =>
  new Promise((resolve, reject) => {
    log('Formatting files...')

    try {
      const projectEslintrcPath = path.join(saguiConfig.projectPath, '.eslintrc')
      const eslintrc = JSON.parse(fs.readFileSync(projectEslintrcPath, 'utf8'))

      const files = [
        ...glob.sync(path.join(saguiConfig.projectPath, 'sagui.config.js')),
        ...glob.sync(path.join(saguiConfig.projectPath, 'src/**/*.{js,jsx,es6}'))
      ]

      const formatted = files
        .map(file => {
          const original = fs.readFileSync(file).toString()
          const formatted = prettier.format(original, getPrettierOptions(eslintrc) || defaultPrettierOptions)

          return [file, original, formatted]
        })
        .filter(([file, original, formatted]) => {
          const changed = original.indexOf(formatted)
          const color = changed ? chalk.green : chalk.dim
          const relativePath = path.relative(saguiConfig.projectPath, file)

          console.log(color(relativePath))
          return changed
        })

      formatted.forEach(([file, original, formatted]) => fs.writeFileSync(file, formatted))

      log(`Formatted ${formatted.length} files.`)

      resolve()
    } catch (error) {
      return reject(error)
    }
  })
