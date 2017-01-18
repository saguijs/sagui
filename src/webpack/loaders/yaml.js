import fileExtensions from '../../file-extensions'

export default {
  name: 'yaml',
  configure () {
    return {
      module: {
        rules: [
          {
            test: fileExtensions.test.YAML,
            use: ['json-loader', 'yaml-loader']
          }
        ]
      }
    }
  }
}
