import path from './path'
import userSettings from './user-settings'
import webpack from './webpack'
import karma from './karma'

export default function env (env = {}) {
  return [
    path,
    userSettings,
    webpack,
    karma
  ].reduce((env, plugin) => plugin(env), env)
}
