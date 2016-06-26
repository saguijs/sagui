import fileExtensions from '../../file-extensions'

export default {
  name: 'yaml',
  configure () {
    return {
      module: {
        loaders: [
          {
            test: fileExtensions.YAML,
            loader: 'json!yaml'
          }
        ]
      }
    }
  }
}
