import path from './path'
import userSettings from './user-settings'
import builder from './builder'
import testRunner from './test-runner'

export default function env (env = {}) {
  return [
    path,
    userSettings,
    builder,
    testRunner
  ].reduce((env, plugin) => plugin(env), env)
}
