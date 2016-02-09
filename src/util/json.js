import { readFileSync, writeFileSync } from 'fs'

export default {
  read (filename) {
    const blob = readFileSync(filename)
    return JSON.parse(blob)
  },

  write (filename, content) {
    writeFileSync(filename, JSON.stringify(content, null, 2))
  }
}
