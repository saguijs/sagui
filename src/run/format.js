import prettier from 'prettier'
import glob from 'glob'
import path from 'path'
import fs from 'fs'
import eslintConfig from '../configure-webpack/loaders/javascript-eslintrc.json'

const prettierOptions = eslintConfig.rules['prettify/prettier'][1]

export default (saguiConfig) => new Promise((resolve, reject) => {
  glob(path.join(saguiConfig.projectPath, 'src/**/*.js'), (error, files) => {
    if (error) { return reject(error) }

    try {
      files.forEach((file) => {
        fs.writeFileSync(file, prettier.format(fs.readFileSync(file).toString(), prettierOptions))
      })
    } catch (error) {
      return reject(error)
    }

    resolve()
  })
})
