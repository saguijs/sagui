import merge from 'webpack-merge'

import font from './font'
import image from './image'
import javaScript from './javascript'
import style from './style'
import txt from './txt'
import video from './video'
import yaml from './yaml'

const loaders = [
  font,
  image,
  javaScript,
  style,
  txt,
  video,
  yaml
]

export default (saguiConfig) => {
  const disabledLoaders = saguiConfig.disabledLoaders || []

  return loaders.filter((loader) => disabledLoaders.indexOf(loader.name) === -1)
    .reduce((webpackConfig, loader) => (
      merge.smart(webpackConfig, loader.configure(saguiConfig))
    ), {})
}
