import fileExtensions from '../../file-extensions'

export default {
  name: 'yaml',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.test.YAML,
            loader: 'json!yaml'
          }
        ]
      }
    }
  }
}
