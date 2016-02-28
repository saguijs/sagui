import path from 'path'

export default {
  name: 'webpack-eslint',
  configure ({ saguiPath }) {
    return {
      eslint: {
        configFile: path.join(saguiPath, '.eslintrc')
      },

      module: {
        preLoaders: [
          {
            test: /\.jsx?$/,
            loader: 'eslint',
            exclude: /node_modules/
          }
        ]
      }
    }
  }
}
