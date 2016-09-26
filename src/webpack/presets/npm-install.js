import NpmInstallPlugin from 'npm-install-webpack-plugin'

export default {
  name: 'npm-install',
  configure ({ autoInstallPackages }) {
    if (!autoInstallPackages) {
      return {}
    }

    return {
      plugins: [
        new NpmInstallPlugin()
      ]
    }
  }
}
