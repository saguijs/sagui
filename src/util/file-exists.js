import { statSync } from 'fs'

export default function fileExists (file) {
  try {
    statSync(file)
    return true
  } catch (e) {
    return false
  }
}
