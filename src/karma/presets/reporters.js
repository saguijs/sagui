export default {
  name: 'frameworks',
  configure () {
    return {
      reporters: ['mocha'],

      // first run will have the full output and
      // the next runs just output the summary and
      // errors in mocha style
      mochaReporter: {
        output: 'autowatch'
      }
    }
  }
}
