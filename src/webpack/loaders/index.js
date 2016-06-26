import merge from 'webpack-merge'

import font from './font'
import image from './image'
import javaScript from './javascript'
import json from './json'
import style from './style'
import video from './video'
import yaml from './yaml'

const loaders = [
  font,
  image,
  javaScript,
  json,
  style,
  video,
  yaml
]

export default (saguiOptions) => {
  const disabledLoaders = saguiOptions.disabledLoaders || []

  return loaders.filter((loader) => disabledLoaders.indexOf(loader.name) === -1)
    .reduce((webpackConfig, loader) => (
      merge.smart(webpackConfig, loader.configure(saguiOptions))
    ), {})
}
