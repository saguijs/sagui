import fileExtensions from '../../file-extensions'

export default {
  name: 'html',
  configure ({ optimize }) {
    return {
      module: {
        rules: [
          {
            test: fileExtensions.test.HTML,
            loader: 'html-loader',
            options: {
              minimize: optimize
            }
          }
        ]
      }
    }
  }
}
