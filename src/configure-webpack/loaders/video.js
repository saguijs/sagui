import fileExtensions from '../../file-extensions'

export default {
  name: 'video',
  configure () {
    return {
      module: {
        rules: [
          {
            test: fileExtensions.test.VIDEO,
            use: {
              loader: 'file-loader',
              options: {
                name: '[name]-[hash].[ext]'
              }
            }
          }
        ]
      }
    }
  }
}
