import plugins from '../plugins'

export default function buildWebpackConfig ({ projectPath, saguiPath, pages, buildTarget }, { watch }) {
  const env = {
    projectPath,
    saguiPath,
    pages,
    buildTarget,
    watch
  }

  return plugins(env).webpackConfig
}
