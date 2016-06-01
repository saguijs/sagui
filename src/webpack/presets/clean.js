import CleanWebpackPlugin from 'clean-webpack-plugin'

export default {
  name: 'clean',
  configure ({ projectPath }) {
    return {
      plugins: [
        new CleanWebpackPlugin(['build'], {
          root: projectPath,
          verbose: false
        })
      ]
    }
  }
}
