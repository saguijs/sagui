import merge from 'webpack-merge'

import library from './library'
import pages from './pages'

const archetypes = [
  library,
  pages
]

export default (saguiOptions) => (
  archetypes.reduce((webpackConfig, archetype) => (
    merge.smart(webpackConfig, archetype.configure(saguiOptions))
  ), {})
)
