import babel from './babel-plugin'
import cssModules from './css-modules-plugin'
import eslint from './eslint-plugin'
import json from './json-plugin'
import media from './media-plugin'
import pages from './pages-plugin'
import scss from './scss-plugin'
import webpackBase from './webpack-base-plugin'

const plugins = [
  babel,
  cssModules,
  eslint,
  json,
  media,
  pages,
  scss,
  webpackBase
]

export default plugins
