import { buildConfig as buildWebpackConfig } from '../src/webpack-config-builder';
import { buildConfig as buildKarmaConfig } from '../src/karma-config-builder';
import { projectPath, saguiPath } from '../src/env';
import KarmaServer from 'karma/lib/server';


export function run () {
  const webpackConfig = buildWebpackConfig({
    saguiPath: saguiPath(),
    projectPath: projectPath()
  });

  const karmaConfig = buildKarmaConfig({
    webpackConfig,
    projectPath: projectPath()
  });

  new KarmaServer(karmaConfig).start();
}
