import NpmInstallPlugin from 'npm-install-webpack-plugin'

export default {
  name: 'auto-install',
  configure ({ autoInstall }) {
    if (!autoInstall) {
      return {}
    }

    return {
      plugins: [
        new NpmInstallPlugin()
      ]
    }
  }
}
