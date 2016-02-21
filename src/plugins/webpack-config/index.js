import babel from './babel-plugin'
import cssModules from './css-modules-plugin'
import defineNodeENV from './define-node-env-plugin'
import eslint from './eslint-plugin'
import json from './json-plugin'
import media from './media-plugin'
import pages from './pages-plugin'
import scss from './scss-plugin'
import webpackBase from './webpack-base-plugin'

export const plugins = [
  babel,
  cssModules,
  defineNodeENV,
  eslint,
  json,
  media,
  pages,
  scss,
  webpackBase
]

export default function run (env = { webpackConfig: {} }) {
  return plugins.reduce((env, plugin) => {
    return plugin(env)
  }, env)
}
