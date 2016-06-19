import eslint from 'eslint'

export default ({ projectPath }) => new Promise((resolve, reject) => {
  const cli = new eslint.CLIEngine({
    extensions: ['.es6', '.js', '.jsx']
  })

  const report = cli.executeOnFiles([projectPath])
  const formatter = cli.getFormatter()

  if (report.errorCount > 0) {
    reject(formatter(report.results))
  } else {
    resolve()
  }
})
