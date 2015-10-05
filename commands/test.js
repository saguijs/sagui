import { buildConfig as buildWebpackConfig } from '../src/webpack-config-builder';
import { buildConfig as buildKarmaConfig } from '../src/karma-config-builder';
import { projectPath, saguiPath } from '../src/env';
import KarmaServer from 'karma/lib/server';


export function run (parameters) {
  const webpackConfig = buildWebpackConfig({
    saguiPath: saguiPath(),
    projectPath: projectPath()
  });

  const karmaConfig = buildKarmaConfig({
    webpackConfig,
    saguiPath: saguiPath(),
    projectPath: projectPath(),
    watch: parameters.includes('--watch')
  });

  new KarmaServer(karmaConfig).start();
}
