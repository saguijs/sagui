import CleanWebpackPlugin from 'clean-webpack-plugin'
import actions from '../../actions'

export default {
  name: 'clean',
  configure ({ projectPath, action }) {
    return {
      plugins: action === actions.BUILD ? [
        new CleanWebpackPlugin(['dist'], {
          root: projectPath,
          verbose: false
        })
      ] : []
    }
  }
}
