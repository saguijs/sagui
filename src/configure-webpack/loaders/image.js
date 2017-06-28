import fileExtensions from '../../file-extensions'

export default {
  name: 'image',
  configure({ action }) {
    return {
      module: {
        rules: [
          {
            test: fileExtensions.test.IMAGE,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: '[name]-[hash].[ext]',
                },
              },
            ],
          },
        ],
      },
    }
  },
}
