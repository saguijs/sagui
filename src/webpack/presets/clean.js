import CleanWebpackPlugin from 'clean-webpack-plugin'

export default {
  name: 'clean',
  configure ({ projectPath }) {
    return {
      plugins: [
        new CleanWebpackPlugin(['dist'], {
          root: projectPath,
          verbose: false
        })
      ]
    }
  }
}
