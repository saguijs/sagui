import merge from 'webpack-merge'

import babel from './babel'
import base from './base'
import cssModules from './css-modules'
import defineNodeENV from './define-node-env'
import eslint from './eslint'
import json from './json'
import media from './media'
import pages from './pages'
import scss from './scss'

export const plugins = [
  babel,
  base,
  cssModules,
  defineNodeENV,
  eslint,
  json,
  media,
  pages,
  scss
]

export default function configureWebpack (config) {
  const { webpackConfig: userWebpackConfig, ...extraConfig } = config

  const defaultWebpackConfig = plugins.reduce((webpackConfig, plugin) => {
    return merge(webpackConfig, plugin(extraConfig))
  }, {})

  const webpackConfig = merge(defaultWebpackConfig, userWebpackConfig)

  return { ...config, webpackConfig }
}
