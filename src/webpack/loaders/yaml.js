import fileExtensions from '../../file-extensions'

export default {
  name: 'yaml',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.pattern.YAML,
            loader: 'json!yaml'
          }
        ]
      }
    }
  }
}
