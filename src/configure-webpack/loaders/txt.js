import fileExtensions from '../../file-extensions'

export default {
  name: 'txt',
  configure() {
    return {
      module: {
        rules: [
          {
            test: fileExtensions.test.TXT,
            loader: 'raw-loader',
          },
        ],
      },
    }
  },
}
